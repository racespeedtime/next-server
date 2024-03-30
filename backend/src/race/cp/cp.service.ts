import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { conditionWhere, getConditionOmits } from 'src/common/utils/condition-where.utils'
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
    const findOptions: FindManyOptions<RaceCp> = {
      where: conditionWhere<GetRaceCpDto>({
        payload,
        equals: ['raceId'],
        mapping: { raceId: 'race.id' },
        omits: getConditionOmits<GetRaceCpDto>(),
      }),
      relations: {
        race: !payload.raceId && !payload.isAll,
      },
      order: {
        createdAt: 'DESC',
      },
    }
    if (!payload.isAll) {
      findOptions.skip = payload.skip
      findOptions.take = payload.take
    }
    const [list, total] = await this.raceCpRepository.findAndCount(findOptions)
    return { list, total }
  }

  findOne(id: string) {
    return this.raceCpRepository.findOne({
      where: { id },
      relations: {
        scripts: true,
      },
    })
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
