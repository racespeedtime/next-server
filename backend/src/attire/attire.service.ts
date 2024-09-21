import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { conditionWhere, getConditionOmits } from 'src/common/utils/condition-where.utils'
import { UserService } from 'src/user/user.service'
import { merge, pick } from 'lodash'
import { User } from 'src/user/entities/user.entity'
import { AttireType } from 'src/common/enums/attire.enum'
import { VehicleService } from 'src/vehicle/vehicle.service'
import { VehicleAttachment } from 'src/vehicle/attachment/entities/attachment.entity'
import { VehicleAttachmentService } from 'src/vehicle/attachment/attachment.service'
import { CreateAttireDto } from './dto/create-attire.dto'
import { UpdateAttireDto } from './dto/update-attire.dto'
import { Attire } from './entities/attire.entity'
import { GetAttireDto } from './dto/get-attire.dto'
import { BuyAttireDto } from './dto/buy-attire.dto'
import { AttireUserService } from './user/user.service'
import { AttireUser } from './user/entities/user.entity'
import { SellAttireDto } from './dto/sell-attire.dto'

@Injectable()
export class AttireService {
  // todo 后续转为数据库字段配置装扮每个能拥有几个，比如默认1个
  private readonly MAX_SAME_PLYER_ATTIRE = 5
  private readonly MAX_SAME_VEHICLE_ATTIRE = 4

  constructor(
    @InjectRepository(Attire) private readonly attireRepository: Repository<Attire>,
    private readonly userService: UserService,
    private readonly vehicleService: VehicleService,
    private readonly attireUserService: AttireUserService,
    private readonly vehicleAttachmentService: VehicleAttachmentService,
  ) {}

  create(createAttireDto: CreateAttireDto) {
    return this.attireRepository.save(createAttireDto)
  }

  async findAll(payload: GetAttireDto) {
    const findOptions: FindManyOptions<Attire> = {
      where: conditionWhere<GetAttireDto>({
        payload,
        omits: getConditionOmits<GetAttireDto>(),
      }),
      order: {
        createdAt: 'DESC',
      },
    }

    if (!payload.isAll) {
      findOptions.skip = payload.skip
      findOptions.take = payload.take
    }
    const [list, total] = await this.attireRepository.findAndCount(findOptions)
    return { list, total }
  }

  async findOne(id: string) {
    const attire = await this.attireRepository.findOne({ where: { id } })
    if (!attire)
      throw new Error('attire not found')
    return attire
  }

  async update(id: string, updateAttireDto: UpdateAttireDto) {
    const attire = await this.findOne(id)

    const merged = this.attireRepository.merge(
      attire,
      updateAttireDto,
    )

    return this.attireRepository.save(merged)
  }

  async remove(id: string) {
    const attire = await this.findOne(id)

    return this.attireRepository.softRemove(attire)
  }

  async buy(buyAttireDto: BuyAttireDto) {
    return this.attireRepository.manager.transaction(async (manager) => {
      const attire = await this.findOne(buyAttireDto.attireId)
      const user = await this.userService.findOne(buyAttireDto.userId)

      if (user.cash < attire.price)
        throw new BadRequestException(`用户没有足够的余额来购买价值${attire.price}的装扮`)

      if (!buyAttireDto.vehicleId) {
        if (attire.type === AttireType.VEHICLE)
          throw new BadRequestException('不能购买爱车类型的装扮作为玩家装扮')

        const count = await this.attireUserService.countSameAttires(attire.id)
        if (count >= this.MAX_SAME_PLYER_ATTIRE)
          throw new BadRequestException(`您已拥有同类型的装扮数${count}个，最大限购${this.MAX_SAME_PLYER_ATTIRE}个！`)

        const attireUser = new AttireUser()
        attireUser.attire = attire
        attireUser.user = user

        const defaultAttireValue = pick(attire, ['boneId', 'x', 'y', 'z', 'rX', 'rY', 'rZ', 'sX', 'sY', 'sZ'])
        const mergedAttireUser = merge(attireUser, defaultAttireValue)

        await manager.save(AttireUser, mergedAttireUser)
      }
      else {
        if (attire.type === AttireType.PLAYER)
          throw new BadRequestException('不能购买玩家类型的装扮作为爱车装扮')

        const vehicle = await this.vehicleService.findOne(buyAttireDto.vehicleId)

        const count = await this.vehicleAttachmentService.countSameAttires(vehicle.id, attire.id)
        if (count >= this.MAX_SAME_VEHICLE_ATTIRE)
          throw new BadRequestException(`您的爱车已拥有同类型的装扮数${count}个，最大限购${this.MAX_SAME_VEHICLE_ATTIRE}个！`)

        const vehicleAttire = new VehicleAttachment()
        vehicleAttire.attire = attire
        vehicleAttire.vehicle = vehicle

        const defaultAttireValue = pick(attire, ['x', 'y', 'z', 'rX', 'rY', 'rZ'])
        const mergedAttireUser = merge(vehicleAttire, defaultAttireValue)

        await manager.save(VehicleAttachment, mergedAttireUser)
      }

      user.cash -= Math.abs(attire.price)

      await manager.save(User, user)
    })
  }

  async sell(sellAttireDto: SellAttireDto) {
    const { attireUserId, vehicleAttireId } = sellAttireDto

    if (!attireUserId && !vehicleAttireId)
      throw new BadRequestException('attireUserId 和 vehicleAttireId 不能同时为空')

    return this.attireRepository.manager.transaction(async (manager) => {
      if (attireUserId) {
        const attireUser = await this.attireUserService.findOne(sellAttireDto.attireUserId)

        const user = attireUser.user
        user.cash += Math.abs(attireUser.attire.price)

        await manager.save(User, user)
        await manager.remove(AttireUser, attireUser)
        return
      }

      const vehicleAttire = await this.vehicleAttachmentService.findOne(sellAttireDto.vehicleAttireId)
      const vehicle = vehicleAttire.vehicle

      vehicle.user.cash += Math.abs(vehicleAttire.attire.price)

      await manager.save(User, vehicle.user)
      await manager.remove(VehicleAttachment, vehicleAttire)
    })
  }
}
