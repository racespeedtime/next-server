import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { conditionWhere, getConditionOmits } from 'src/common/utils/condition-where.utils'
import { UserService } from 'src/user/user.service'
import { merge, omit, pick } from 'lodash'
import { User } from 'src/user/entities/user.entity'
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
  private readonly MAX_SAME_ATTIRE = 5

  constructor(
    @InjectRepository(Attire) private readonly attireRepository: Repository<Attire>,
    private readonly userService: UserService,
    private readonly attireUserService: AttireUserService,
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
        updatedAt: 'DESC',
      },
    }

    if (!payload.isAll) {
      findOptions.skip = payload.skip
      findOptions.take = payload.take
    }
    const [list, total] = await this.attireRepository.findAndCount(findOptions)
    return { list, total }
  }

  findOne(id: string) {
    return this.attireRepository.findOne({ where: { id } })
  }

  async update(id: string, updateAttireDto: UpdateAttireDto) {
    const attire = await this.findOne(id)
    if (!attire)
      throw new Error('attire not found')

    const merged = this.attireRepository.merge(
      attire,
      updateAttireDto,
    )

    return this.attireRepository.save(merged)
  }

  async remove(id: string) {
    const attire = await this.findOne(id)
    if (!attire)
      throw new Error('attire not found')

    return this.attireRepository.softRemove(attire)
  }

  async buy(buyAttireDto: BuyAttireDto) {
    return this.attireRepository.manager.transaction(async (manager) => {
      const user = await this.userService.findOne(buyAttireDto.userId)
      const attire = await this.findOne(buyAttireDto.attireId)

      if (user.cash < attire.price)
        throw new BadRequestException(`用户没有足够的余额来购买价值${attire.price}的装扮`)

      const count = await this.attireUserService.countSameAttires(attire.id)
      if (count > this.MAX_SAME_ATTIRE)
        throw new BadRequestException(`您已拥有同类型的装扮数${count}个，超出限购的${this.MAX_SAME_ATTIRE}无法购买！`)

      user.cash -= Math.abs(attire.price)

      const attireUser = new AttireUser()
      attireUser.attire = attire
      attireUser.user = user

      const defaultAttireValue = pick(attire, ['boneId', 'x', 'y', 'z', 'rX', 'rY', 'rZ', 'sX', 'sY', 'sZ'])
      const mergedAttireUser = merge(attireUser, defaultAttireValue)

      await manager.save(User, user)
      await manager.save(AttireUser, mergedAttireUser)
      return attireUser
    })
  }

  async sell(sellAttireDto: SellAttireDto) {
    return this.attireRepository.manager.transaction(async (manager) => {
      const attireUser = await this.attireUserService.findOne(sellAttireDto.attireUserId)

      const user = attireUser.user
      user.cash += Math.abs(attireUser.attire.price)

      await manager.save(User, user)
      await manager.remove(AttireUser, attireUser)

      return attireUser
    })
  }
}
