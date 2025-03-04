import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { conditionWhere, getConditionOmits } from 'src/common/utils/condition-where.utils'
import { CreateTeamDto } from './dto/create-team.dto'
import { UpdateTeamDto } from './dto/update-team.dto'
import { GetTeamDto } from './dto/get-team.dto'
import { Team } from './entities/team.entity'

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
  ) {}

  create(createTeamDto: CreateTeamDto) {
    return this.teamRepository.save(createTeamDto)
  }

  async findAll(payload: GetTeamDto) {
    const findOptions: FindManyOptions<Team> = {
      where: conditionWhere<GetTeamDto>({
        payload,
        mapping: { userId: 'user.id' },
        equals: ['userId'],
        omits: getConditionOmits<GetTeamDto>(),
      }),
      relations: {
        user: !payload.isAll,
      },
      order: {
        createdAt: 'DESC',
      },
    }
    if (!payload.isAll) {
      findOptions.skip = payload.skip
      findOptions.take = payload.take
    }
    const [list, total] = await this.teamRepository.findAndCount(findOptions)
    return { list, total }
  }

  findOne(id: string) {
    return this.teamRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    })
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    const team = await this.findOne(id)
    if (!team)
      throw new Error('team not found')

    const merged = this.teamRepository.merge(
      team,
      updateTeamDto,
    )

    return this.teamRepository.save(merged)
  }

  async remove(id: string) {
    const team = await this.findOne(id)
    if (!team)
      throw new Error('team not found')

    return this.teamRepository.softRemove(team)
  }
}
