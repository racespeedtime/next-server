import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateAttireDto } from './dto/create-attire.dto'
import { UpdateAttireDto } from './dto/update-attire.dto'
import { Attire } from './entities/attire.entity'
import { GetAttireDto } from './dto/get-attire.dto'

@Injectable()
export class AttireService {
  constructor(
    @InjectRepository(Attire) private readonly attireRepository: Repository<Attire>,
  ) {}

  create(createAttireDto: CreateAttireDto) {
    return this.attireRepository.save(createAttireDto)
  }

  async findAll(payload: GetAttireDto) {
    const [list, total] = await this.attireRepository.findAndCount({
      skip: payload.skip,
      take: payload.take,
    })
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
}
