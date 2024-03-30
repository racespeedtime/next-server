import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { conditionWhere, getConditionOmits } from 'src/common/utils/condition-where.utils'
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
    const findOptions: FindManyOptions<Teleport> = {
      where: conditionWhere<GetTeleportDto>({
        payload,
        mapping: { userId: 'user.id' },
        equals: ['userId', 'interiorId', 'isEnabled', 'isSystem'],
        omits: getConditionOmits<GetTeleportDto>(),
      }),
      relations: {
        user: !payload.isAll,
        house: !payload.isAll,
      },
      order: {
        createdAt: 'DESC',
      },
    }
    if (!payload.isAll) {
      findOptions.skip = payload.skip
      findOptions.take = payload.take
    }
    const [list, total] = await this.teleportRepository.findAndCount(findOptions)
    return { list, total }
  }

  findOne(id: string) {
    return this.teleportRepository.findOne(
      {
        where: { id },
        relations: {
          user: true,
          house: true,
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
