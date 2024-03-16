import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateRaceDto } from './dto/create-race.dto'
import { UpdateRaceDto } from './dto/update-race.dto'
import { GetRaceDto } from './dto/get-race.dto'
import { Race } from './entities/race.entity'

@Injectable()
export class RaceService {
  constructor(
    @InjectRepository(Race) private readonly raceRepository: Repository<Race>,
  ) {}

  create(createRaceDto: CreateRaceDto) {
    return this.raceRepository.save(createRaceDto)
  }

  async findAll(payload: GetRaceDto) {
    const [list, total] = await this.raceRepository.findAndCount({
      skip: payload.skip,
      take: payload.take,
      relations: {
        user: true,
      },
      order: {
        createdAt: 'DESC',
      },
    })
    return { list, total }
  }

  findOne(id: string) {
    return this.raceRepository.findOne(
      {
        where: { id },
        relations: {
          user: true,
        },
      },
    )
  }

  async update(id: string, updateRaceDto: UpdateRaceDto) {
    const race = await this.findOne(id)
    if (!race)
      throw new Error('race not found')

    const merged = this.raceRepository.merge(
      race,
      updateRaceDto,
    )

    return this.raceRepository.save(merged)
  }

  async remove(id: string) {
    const race = await this.findOne(id)
    if (!race)
      throw new Error('race not found')

    return this.raceRepository.remove(race)
  }
}
