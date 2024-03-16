import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { TeamService } from './team.service'
import { CreateTeamDto } from './dto/create-team.dto'
import { UpdateTeamDto } from './dto/update-team.dto'
import { GetTeamDto } from './dto/get-team.dto'

@ApiTags('team')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto)
  }

  @Get()
  findAll(@Query(new PaginatePipe()) params: GetTeamDto) {
    return this.teamService.findAll(params)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(id, updateTeamDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(id)
  }
}
