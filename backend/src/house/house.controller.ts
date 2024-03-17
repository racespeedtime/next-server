import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { HouseService } from './house.service'
import { CreateHouseDto } from './dto/create-house.dto'
import { UpdateHouseDto } from './dto/update-house.dto'
import { GetHouseDto } from './dto/get-house.dto'

@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post()
  create(@Body() createHouseDto: CreateHouseDto) {
    return this.houseService.create(createHouseDto)
  }

  @Get()
  findAll(@Query(new PaginatePipe()) params: GetHouseDto) {
    return this.houseService.findAll(params)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.houseService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto) {
    return this.houseService.update(id, updateHouseDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.houseService.remove(id)
  }
}
