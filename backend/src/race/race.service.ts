import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { conditionWhere, getConditionOmits } from 'src/common/utils/condition-where.utils'
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
    const findOptions: FindManyOptions<Race> = {
      where: conditionWhere<GetRaceDto>({
        payload,
        mapping: { userId: 'user.id' },
        equals: ['userId', 'isEnabled'],
        omits: getConditionOmits<GetRaceDto>(),
      }),
      relations: {
        user: !payload.isAll,
        house: !payload.isAll,
      },
      order: {
        updatedAt: 'DESC',
      },
    }
    if (!payload.isAll) {
      findOptions.skip = payload.skip
      findOptions.take = payload.take
    }
    const [list, total] = await this.raceRepository.findAndCount(findOptions)
    return { list, total }
  }

  findOne(id: string) {
    return this.raceRepository.findOne(
      {
        where: { id },
        relations: {
          user: true,
          house: true,
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

    return this.raceRepository.softRemove(race)
  }
}
