import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { HouseModelService } from './model.service'
import { CreateHouseModelDto } from './dto/create-model.dto'
import { UpdateHouseModelDto } from './dto/update-model.dto'
import { GetHouseModelDto } from './dto/get-model.dto'

@ApiTags('house/model')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('house/model')
export class HouseModelController {
  constructor(private readonly houseModelService: HouseModelService) {}

  @Post()
  create(@Body() createHouseModelDto: CreateHouseModelDto) {
    return this.houseModelService.create(createHouseModelDto)
  }

  @Get()
  findAll(@Query(new PaginatePipe()) query: GetHouseModelDto) {
    return this.houseModelService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.houseModelService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseModelDto: UpdateHouseModelDto) {
    return this.houseModelService.update(id, updateHouseModelDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.houseModelService.remove(id)
  }
}
