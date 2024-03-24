import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, FindManyOptions, Repository } from 'typeorm'
import { conditionWhere, getConditionOmits } from 'src/common/utils/condition-where.utils'
import { CreateTeamUserDto } from './dto/create-user.dto'
import { UpdateTeamUserDto } from './dto/update-user.dto'
import { GetTeamUserDto } from './dto/get-user.dto'
import { TeamUser } from './entities/user.entity'

@Injectable()
export class TeamUserService {
  constructor(
    @InjectRepository(TeamUser) private readonly teamUserRepository: Repository<TeamUser>,
  ) {}

  create(createTeamUserDto: CreateTeamUserDto) {
    return this.teamUserRepository.save(createTeamUserDto)
  }

  async findAll(payload: GetTeamUserDto) {
    const findOptions: FindManyOptions<TeamUser> = {
      where: conditionWhere<GetTeamUserDto>({
        payload,
        mapping: { userId: 'user.id', teamId: 'team.id' },
        equals: ['userId', 'teamId', 'isAdmin'],
        omits: getConditionOmits<GetTeamUserDto>(),
      }),
      relations: {
        user: !payload.isAll,
        team: !payload.isAll,
      },
      order: {
        isAdmin: 'DESC',
        createdAt: 'DESC',
      },
    }
    if (!payload.isAll) {
      findOptions.skip = payload.skip
      findOptions.take = payload.take
    }
    const [list, total] = await this.teamUserRepository.findAndCount(findOptions)
    return { list, total }
  }

  findOne(id: string) {
    return this.teamUserRepository.findOne({ where: { id } })
  }

  async update(id: string, updateTeamUserDto: UpdateTeamUserDto) {
    const teamUser = await this.findOne(id)
    if (!teamUser)
      throw new Error('teamUser not found')

    const merged = this.teamUserRepository.merge(
      teamUser,
      updateTeamUserDto,
    )

    return this.teamUserRepository.save(merged)
  }

  async remove(id: string) {
    const teamUser = await this.findOne(id)
    if (!teamUser)
      throw new Error('teamUser not found')

    return this.teamUserRepository.remove(teamUser)
  }
}
