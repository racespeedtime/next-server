import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
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
    const [list, total] = await this.teamUserRepository.findAndCount({
      skip: payload.skip,
      take: payload.take,
    })
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
