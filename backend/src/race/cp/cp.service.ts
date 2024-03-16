import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RaceCp } from './entities/cp.entity'
import { CreateRaceCpDto } from './dto/create-cp.dto'
import { GetRaceCpDto } from './dto/get-cp.dto'
import { UpdateRaceCpDto } from './dto/update-cp.dto'

@Injectable()
export class RaceCpService {
  constructor(
    @InjectRepository(RaceCp) private readonly raceCpRepository: Repository<RaceCp>,
  ) {}

  create(createRaceCpDto: CreateRaceCpDto) {
    return this.raceCpRepository.save(createRaceCpDto)
  }

  async findAll(payload: GetRaceCpDto) {
    const [list, total] = await this.raceCpRepository.findAndCount({
      skip: payload.skip,
      take: payload.take,
    })
    return { list, total }
  }

  findOne(id: string) {
    return this.raceCpRepository.findOne({ where: { id } })
  }

  async update(id: string, updateRaceCpDto: UpdateRaceCpDto) {
    const raceCp = await this.findOne(id)
    if (!raceCp)
      throw new Error('raceCp not found')

    const merged = this.raceCpRepository.merge(
      raceCp,
      updateRaceCpDto,
    )

    return this.raceCpRepository.save(merged)
  }

  async remove(id: string) {
    const raceCp = await this.findOne(id)
    if (!raceCp)
      throw new Error('raceCp not found')

    return this.raceCpRepository.remove(raceCp)
  }
}
