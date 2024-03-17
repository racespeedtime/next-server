import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { HouseModelService } from './model.service'
import { CreateHouseModelDto } from './dto/create-model.dto'
import { UpdateHouseModelDto } from './dto/update-model.dto'

@Controller('model')
export class HouseModelController {
  constructor(private readonly houseModelService: HouseModelService) {}

  @Post()
  create(@Body() createHouseModelDto: CreateHouseModelDto) {
    return this.houseModelService.create(createHouseModelDto)
  }

  @Get()
  findAll() {
    return this.houseModelService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.houseModelService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseModelDto: UpdateHouseModelDto) {
    return this.houseModelService.update(+id, updateHouseModelDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.houseModelService.remove(+id)
  }
}
