import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { conditionWhere, getConditionOmits } from 'src/common/utils/condition-where.utils'
import { CreateGoodDto } from './dto/create-good.dto'
import { UpdateGoodDto } from './dto/update-good.dto'
import { Goods } from './entities/goods.entity'
import { GetGoodsDto } from './dto/get-goods.dto'

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Goods) private readonly goodsRepository: Repository<Goods>,
  ) {}

  create(createGoodsDto: CreateGoodDto) {
    return this.goodsRepository.save(createGoodsDto)
  }

  async findAll(payload: GetGoodsDto) {
    const findOptions: FindManyOptions<Goods> = {
      where: conditionWhere<GetGoodsDto>({
        payload,
        mapping: { userId: 'user.id' },
        equals: ['userId'],
        omits: getConditionOmits<GetGoodsDto>(),
      }),
      relations: {
        user: !payload.isAll,
      },
      order: {
        createdAt: 'DESC',
      },
    }
    if (!payload.isAll) {
      findOptions.skip = payload.skip
      findOptions.take = payload.take
    }
    const [list, total] = await this.goodsRepository.findAndCount(findOptions)
    return { list, total }
  }

  findOne(id: string) {
    return this.goodsRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    })
  }

  async update(id: string, updateGoodsDto: UpdateGoodDto) {
    const goods = await this.findOne(id)
    if (!goods)
      throw new Error('goods not found')

    const merged = this.goodsRepository.merge(
      goods,
      updateGoodsDto,
    )

    return this.goodsRepository.save(merged)
  }

  async remove(id: string) {
    const goods = await this.findOne(id)
    if (!goods)
      throw new Error('goods not found')

    return this.goodsRepository.remove(goods)
  }
}
