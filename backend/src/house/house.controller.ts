import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { HouseService } from './house.service'
import { CreateHouseDto } from './dto/create-house.dto'
import { UpdateHouseDto } from './dto/update-house.dto'
import { GetHouseDto } from './dto/get-house.dto'

@ApiTags('house')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post()
  create(@Body() createHouseDto: CreateHouseDto) {
    return this.houseService.create(createHouseDto)
  }

  @Get()
  findAll(@Query(new PaginatePipe()) query: GetHouseDto) {
    return this.houseService.findAll(query)
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
