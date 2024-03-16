import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { RaceRecordService } from './record.service'
import { CreateRaceRecordDto } from './dto/create-record.dto'
import { UpdateRaceRecordDto } from './dto/update-record.dto'
import { GetRaceRecordDto } from './dto/get-record.dto'

@ApiTags('race/record')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('race/record')
export class RaceRecordController {
  constructor(private readonly raceRecordService: RaceRecordService) {}

  @Post()
  create(@Body() createRaceRecordDto: CreateRaceRecordDto) {
    return this.raceRecordService.create(createRaceRecordDto)
  }

  @Get()
  findAll(@Query(new PaginatePipe()) params: GetRaceRecordDto) {
    return this.raceRecordService.findAll(params)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raceRecordService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecordDto: UpdateRaceRecordDto) {
    return this.raceRecordService.update(id, updateRecordDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raceRecordService.remove(id)
  }
}
