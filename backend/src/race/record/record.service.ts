import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { conditionWhere, getConditionOmits } from 'src/common/utils/condition-where.utils'
import { CreateRaceRecordDto } from './dto/create-record.dto'
import { UpdateRaceRecordDto } from './dto/update-record.dto'
import { GetRaceRecordDto } from './dto/get-record.dto'
import { RaceRecord } from './entities/record.entity'

@Injectable()
export class RaceRecordService {
  constructor(
    @InjectRepository(RaceRecord) private readonly raceRecordRepository: Repository<RaceRecord>,
  ) {}

  create(createRaceRecordDto: CreateRaceRecordDto) {
    return this.raceRecordRepository.save(createRaceRecordDto)
  }

  async findAll(payload: GetRaceRecordDto) {
    const findOptions: FindManyOptions<RaceRecord> = {
      where: conditionWhere<GetRaceRecordDto>({
        payload,
        equals: ['raceId', 'userId'],
        mapping: { raceId: 'race.id', userId: 'user.id' },
        omits: getConditionOmits<GetRaceRecordDto>(),
      }),
      order: {
        updatedAt: 'DESC',
        record: 'ASC',
      },
      relations: {
        race: !payload.raceId && !payload.isAll,
        user: !payload.userId && !payload.isAll,
      },
    }
    if (!payload.isAll) {
      findOptions.skip = payload.skip
      findOptions.take = payload.take
    }
    const [list, total] = await this.raceRecordRepository.findAndCount(findOptions)
    return { list, total }
  }

  findOne(id: string) {
    return this.raceRecordRepository.findOne({
      where: { id },
      relations: { race: true, user: true },
    })
  }

  async update(id: string, updateRaceRecordDto: UpdateRaceRecordDto) {
    const raceRecord = await this.findOne(id)
    if (!raceRecord)
      throw new Error('raceRecord not found')

    const merged = this.raceRecordRepository.merge(
      raceRecord,
      updateRaceRecordDto,
    )

    return this.raceRecordRepository.save(merged)
  }

  async remove(id: string) {
    const raceRecord = await this.findOne(id)
    if (!raceRecord)
      throw new Error('raceRecord not found')

    return this.raceRecordRepository.softRemove(raceRecord)
  }
}
