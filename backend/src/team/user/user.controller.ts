import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { TeamUserService } from './user.service'
import { CreateTeamUserDto } from './dto/create-user.dto'
import { UpdateTeamUserDto } from './dto/update-user.dto'
import { GetTeamUserDto } from './dto/get-user.dto'

@ApiTags('team/user')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('team/user')
export class TeamUserController {
  constructor(private readonly teamUserService: TeamUserService) {}

  @Post()
  create(@Body() createUserDto: CreateTeamUserDto) {
    return this.teamUserService.create(createUserDto)
  }

  @Get()
  findAll(@Query(new PaginatePipe()) query: GetTeamUserDto) {
    return this.teamUserService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamUserService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateTeamUserDto) {
    return this.teamUserService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamUserService.remove(id)
  }
}
