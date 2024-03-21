import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateTeleportDto } from './dto/create-teleport.dto'
import { UpdateTeleportDto } from './dto/update-teleport.dto'
import { GetTeleportDto } from './dto/get-teleport.dto'
import { Teleport } from './entities/teleport.entity'

@Injectable()
export class TeleportService {
  constructor(
    @InjectRepository(Teleport) private readonly teleportRepository: Repository<Teleport>,
  ) {}

  create(createTeleportDto: CreateTeleportDto) {
    return this.teleportRepository.save(createTeleportDto)
  }

  async findAll(payload: GetTeleportDto) {
    const [list, total] = await this.teleportRepository.findAndCount({
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
    return this.teleportRepository.findOne(
      {
        where: { id },
        relations: {
          user: true,
        },
      },
    )
  }

  async update(id: string, updateTeleportDto: UpdateTeleportDto) {
    const teleport = await this.findOne(id)
    if (!teleport)
      throw new Error('teleport not found')

    const merged = this.teleportRepository.merge(
      teleport,
      updateTeleportDto,
    )

    return this.teleportRepository.save(merged)
  }

  async remove(id: string) {
    const teleport = await this.findOne(id)
    if (!teleport)
      throw new Error('teleport not found')

    return this.teleportRepository.softRemove(teleport)
  }
}
