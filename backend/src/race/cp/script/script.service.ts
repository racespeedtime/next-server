import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { conditionWhere, getConditionOmits } from 'src/common/utils/condition-where.utils'
import { CreateRaceCpScriptDto } from './dto/create-script.dto'
import { UpdateRaceCpScriptDto } from './dto/update-script.dto'
import { GetRaceCpScriptDto } from './dto/get-script.dto'
import { RaceCpScript } from './entities/script.entity'

@Injectable()
export class RaceCpScriptService {
  constructor(
    @InjectRepository(RaceCpScript) private readonly raceCpScriptRepository: Repository<RaceCpScript>,
  ) {}

  create(createRaceDto: CreateRaceCpScriptDto) {
    return this.raceCpScriptRepository.save(createRaceDto)
  }

  async findAll(payload: GetRaceCpScriptDto) {
    const findOptions: FindManyOptions<RaceCpScript> = {
      where: conditionWhere<GetRaceCpScriptDto>({
        payload,
        equals: ['raceId', 'checkpointId'],
        mapping: { raceId: 'race.id', checkpointId: 'checkpoint.id' },
        omits: getConditionOmits<GetRaceCpScriptDto>(),
      }),
      order: {
        createdAt: 'DESC',
      },
    }
    if (!payload.isAll) {
      findOptions.skip = payload.skip
      findOptions.take = payload.take
    }
    const [list, total] = await this.raceCpScriptRepository.findAndCount(findOptions)
    return { list, total }
  }

  findOne(id: string) {
    return this.raceCpScriptRepository.findOne({ where: { id } })
  }

  async update(id: string, updateRaceDto: UpdateRaceCpScriptDto) {
    const raceCpScript = await this.findOne(id)
    if (!raceCpScript)
      throw new Error('raceCpScript not found')

    const merged = this.raceCpScriptRepository.merge(
      raceCpScript,
      updateRaceDto,
    )

    return this.raceCpScriptRepository.save(merged)
  }

  async remove(id: string) {
    const raceCpScript = await this.findOne(id)
    if (!raceCpScript)
      throw new Error('raceCpScript not found')

    return this.raceCpScriptRepository.remove(raceCpScript)
  }
}
