import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { RaceCpService } from './cp.service'
import { CreateRaceCpDto } from './dto/create-cp.dto'
import { UpdateRaceCpDto } from './dto/update-cp.dto'
import { GetRaceCpDto } from './dto/get-cp.dto'

@ApiTags('race/cp')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('race/cp')
export class RaceCpController {
  constructor(private readonly raceCpService: RaceCpService) {}

  @Post()
  create(@Body() createCpDto: CreateRaceCpDto) {
    return this.raceCpService.create(createCpDto)
  }

  @Get()
  findAll(@Query(new PaginatePipe()) params: GetRaceCpDto) {
    return this.raceCpService.findAll(params)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raceCpService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCpDto: UpdateRaceCpDto) {
    return this.raceCpService.update(id, updateCpDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raceCpService.remove(id)
  }
}
