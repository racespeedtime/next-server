import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
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
    const [list, total] = await this.raceCpScriptRepository.findAndCount({
      skip: payload.skip,
      take: payload.take,
    })
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
