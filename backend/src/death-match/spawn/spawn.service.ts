import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateDeathMatchSpawnDto } from './dto/create-spawn.dto'
import { UpdateDeathMatchSpawnDto } from './dto/update-spawn.dto'
import { GetDeathMatchSpawnDto } from './dto/get-spawn.dto'
import { DeathMatchSpawn } from './entities/spawn.entity'

@Injectable()
export class DeathMatchSpawnService {
  constructor(
    @InjectRepository(DeathMatchSpawn) private readonly deathMatchSpawnRepository: Repository<DeathMatchSpawn>,
  ) {}

  create(createDeathMatchSpawnDto: CreateDeathMatchSpawnDto) {
    return this.deathMatchSpawnRepository.save(createDeathMatchSpawnDto)
  }

  async findAll(payload: GetDeathMatchSpawnDto) {
    const [list, total] = await this.deathMatchSpawnRepository.findAndCount({
      skip: payload.skip,
      take: payload.take,
    })
    return { list, total }
  }

  findOne(id: string) {
    return this.deathMatchSpawnRepository.findOne({ where: { id } })
  }

  async update(id: string, updateDeathMatchSpawnDto: UpdateDeathMatchSpawnDto) {
    const deathMatchSpawn = await this.findOne(id)
    if (!deathMatchSpawn)
      throw new Error('deathMatchSpawn not found')

    const merged = this.deathMatchSpawnRepository.merge(
      deathMatchSpawn,
      updateDeathMatchSpawnDto,
    )

    return this.deathMatchSpawnRepository.save(merged)
  }

  async remove(id: string) {
    const deathMatchSpawn = await this.findOne(id)
    if (!deathMatchSpawn)
      throw new Error('deathMatchSpawn not found')

    return this.deathMatchSpawnRepository.remove(deathMatchSpawn)
  }
}
