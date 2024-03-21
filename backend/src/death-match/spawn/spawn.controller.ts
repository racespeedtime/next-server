import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { DeathMatchSpawnService } from './spawn.service'
import { CreateDeathMatchSpawnDto } from './dto/create-spawn.dto'
import { UpdateDeathMatchSpawnDto } from './dto/update-spawn.dto'
import { GetDeathMatchSpawnDto } from './dto/get-spawn.dto'

@ApiTags('death-match/spawn')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('death-match/spawn')
export class DeathMatchSpawnController {
  constructor(private readonly deathMatchSpawnService: DeathMatchSpawnService) {}

  @Post()
  create(@Body() createDeathMatchSpawnDto: CreateDeathMatchSpawnDto) {
    return this.deathMatchSpawnService.create(createDeathMatchSpawnDto)
  }

  @Get()
  findAll(@Query(new PaginatePipe()) query: GetDeathMatchSpawnDto) {
    return this.deathMatchSpawnService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deathMatchSpawnService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeathMatchSpawnDto: UpdateDeathMatchSpawnDto) {
    return this.deathMatchSpawnService.update(id, updateDeathMatchSpawnDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deathMatchSpawnService.remove(id)
  }
}
