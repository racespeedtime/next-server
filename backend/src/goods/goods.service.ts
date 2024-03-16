import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
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
    const [list, total] = await this.goodsRepository.findAndCount({
      skip: payload.skip,
      take: payload.take,
    })
    return { list, total }
  }

  findOne(id: string) {
    return this.goodsRepository.findOne({ where: { id } })
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
