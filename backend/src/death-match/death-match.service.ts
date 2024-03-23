import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { conditionWhere, getConditionOmits } from 'src/common/utils/condition-where.utils'
import { CreateDeathMatchDto } from './dto/create-death-match.dto'
import { UpdateDeathMatchDto } from './dto/update-death-match.dto'
import { GetDeathMatchDto } from './dto/get-death-match.dto'
import { DeathMatch } from './entities/death-match.entity'

@Injectable()
export class DeathMatchService {
  constructor(
    @InjectRepository(DeathMatch) private readonly deathMatchRepository: Repository<DeathMatch>,
  ) {}

  create(createDeathMatchDto: CreateDeathMatchDto) {
    return this.deathMatchRepository.save(createDeathMatchDto)
  }

  async findAll(payload: GetDeathMatchDto) {
    const findOptions: FindManyOptions<DeathMatch> = {
      where: conditionWhere<GetDeathMatchDto>({
        payload,
        omits: getConditionOmits<GetDeathMatchDto>(),
      }),
      relations: {
        spawns: true,
        weapons: true,
      },
      order: {
        updatedAt: 'DESC',
      },
    }
    if (!payload.isAll) {
      findOptions.skip = payload.skip
      findOptions.take = payload.take
    }
    const [list, total] = await this.deathMatchRepository.findAndCount(findOptions)
    return { list, total }
  }

  findOne(id: string) {
    return this.deathMatchRepository.findOne(
      {
        where: { id },
        relations: {
          spawns: true,
          weapons: true,
        },
      },
    )
  }

  async update(id: string, updateDeathMatchDto: UpdateDeathMatchDto) {
    const deathMatch = await this.findOne(id)
    if (!deathMatch)
      throw new Error('deathMatch not found')

    const merged = this.deathMatchRepository.merge(
      deathMatch,
      updateDeathMatchDto,
    )

    return this.deathMatchRepository.save(merged)
  }

  async remove(id: string) {
    const deathMatch = await this.findOne(id)
    if (!deathMatch)
      throw new Error('deathMatch not found')

    return this.deathMatchRepository.softRemove(deathMatch)
  }
}
