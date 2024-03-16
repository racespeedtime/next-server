import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
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
    const [list, total] = await this.teamRepository.findAndCount({
      skip: payload.skip,
      take: payload.take,
    })
    return { list, total }
  }

  findOne(id: string) {
    return this.teamRepository.findOne({ where: { id } })
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

    return this.teamRepository.remove(team)
  }
}
