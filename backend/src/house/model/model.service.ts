import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, In, Repository } from 'typeorm'
import { conditionWhere, getConditionOmits } from 'src/common/utils/condition-where.utils'
import { CreateHouseModelDto } from './dto/create-model.dto'
import { UpdateHouseModelDto } from './dto/update-model.dto'
import { GetHouseModelDto } from './dto/get-model.dto'
import { HouseModel } from './entities/model.entity'

@Injectable()
export class HouseModelService {
  constructor(
    @InjectRepository(HouseModel) private readonly houseModelRepository: Repository<HouseModel>,
  ) {}

  create(createHouseModelDto: CreateHouseModelDto) {
    return this.houseModelRepository.save(createHouseModelDto)
  }

  async findAll(payload: GetHouseModelDto) {
    const findOptions: FindManyOptions<HouseModel> = {
      where: conditionWhere<GetHouseModelDto>({
        payload,
        equals: ['houseId', 'type'],
        mapping: { houseId: 'house.id' },
        omits: getConditionOmits<GetHouseModelDto>(),
      }),
      order: {
        createdAt: 'DESC',
      },
    }
    if (!payload.isAll) {
      findOptions.skip = payload.skip
      findOptions.take = payload.take
    }
    const [list, total] = await this.houseModelRepository.findAndCount(findOptions)
    return { list, total }
  }

  findOne(id: string) {
    return this.houseModelRepository.findOne({ where: { id } })
  }

  async update(id: string, updateHouseModelDto: UpdateHouseModelDto) {
    const houseModel = await this.findOne(id)
    if (!houseModel)
      throw new Error('houseModel not found')

    const merged = this.houseModelRepository.merge(
      houseModel,
      updateHouseModelDto,
    )

    return this.houseModelRepository.save(merged)
  }

  async remove(id: string) {
    const houseModel = await this.findOne(id)
    if (!houseModel)
      throw new Error('houseModel not found')

    return this.houseModelRepository.remove(houseModel)
  }

  async getSellPrice(id: string): Promise<number>
  async getSellPrice(id: string[]): Promise<number[]>
  async getSellPrice(id: string | string[]) {
    const isArrayId = Array.isArray(id)

    const sellModels = await this.houseModelRepository.find({
      where: {
        house: { id: isArrayId ? In(id) : id },
        type: 'sell',
      },
    })
    if (!sellModels)
      throw new BadRequestException('房屋未定义出售价格')

    if (isArrayId)
      return sellModels.map(item => Math.abs(+item.args.split(',')[0]))
    return Math.abs(+sellModels[0].args.split(',')[0])
  }
}
