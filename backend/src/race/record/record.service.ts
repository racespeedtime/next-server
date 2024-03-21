import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
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
    const [list, total] = await this.raceRecordRepository.findAndCount({
      skip: payload.skip,
      take: payload.take,
    })
    return { list, total }
  }

  findOne(id: string) {
    return this.raceRecordRepository.findOne({ where: { id } })
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
