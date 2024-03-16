import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { RaceCpScriptService } from './script.service'
import { CreateRaceCpScriptDto } from './dto/create-script.dto'
import { UpdateRaceCpScriptDto } from './dto/update-script.dto'
import { GetRaceCpScriptDto } from './dto/get-script.dto'

@ApiTags('race/cp/script')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('race/cp/script')

export class RaceCpScriptController {
  constructor(private readonly raceCpScriptService: RaceCpScriptService) {}

  @Post()
  create(@Body() createCpDto: CreateRaceCpScriptDto) {
    return this.raceCpScriptService.create(createCpDto)
  }

  @Get()
  findAll(@Query(new PaginatePipe()) params: GetRaceCpScriptDto) {
    return this.raceCpScriptService.findAll(params)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raceCpScriptService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCpDto: UpdateRaceCpScriptDto) {
    return this.raceCpScriptService.update(id, updateCpDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raceCpScriptService.remove(id)
  }
}
