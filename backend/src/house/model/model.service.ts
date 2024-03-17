import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
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
    const [list, total] = await this.houseModelRepository.findAndCount({
      skip: payload.skip,
      take: payload.take,
    })
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
}
