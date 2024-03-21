import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GetHouseDto } from './dto/get-house.dto'
import { House } from './entities/house.entity'
import { CreateHouseDto } from './dto/create-house.dto'
import { UpdateHouseDto } from './dto/update-house.dto'

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House) private readonly houseRepository: Repository<House>,
  ) {}

  create(createHouseDto: CreateHouseDto) {
    return this.houseRepository.save(createHouseDto)
  }

  async findAll(payload: GetHouseDto) {
    const [list, total] = await this.houseRepository.findAndCount({
      skip: payload.skip,
      take: payload.take,
    })
    return { list, total }
  }

  findOne(id: string) {
    return this.houseRepository.findOne({ where: { id } })
  }

  async update(id: string, updateHouseDto: UpdateHouseDto) {
    const house = await this.findOne(id)
    if (!house)
      throw new Error('house not found')

    const merged = this.houseRepository.merge(
      house,
      updateHouseDto,
    )

    return this.houseRepository.save(merged)
  }

  async remove(id: string) {
    const house = await this.findOne(id)
    if (!house)
      throw new Error('house not found')

    return this.houseRepository.softRemove(house)
  }
}
