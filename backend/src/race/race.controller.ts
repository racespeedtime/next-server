import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { RaceService } from './race.service'
import { CreateRaceDto } from './dto/create-race.dto'
import { UpdateRaceDto } from './dto/update-race.dto'

@ApiTags('race')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('race')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @Post()
  create(@Body() createRaceDto: CreateRaceDto) {
    return this.raceService.create(createRaceDto)
  }

  @Get()
  findAll() {
    return this.raceService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raceService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRaceDto: UpdateRaceDto) {
    return this.raceService.update(+id, updateRaceDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raceService.remove(+id)
  }
}
