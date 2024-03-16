import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { TeleportService } from './teleport.service'
import { CreateTeleportDto } from './dto/create-teleport.dto'
import { UpdateTeleportDto } from './dto/update-teleport.dto'
import { GetTeleportDto } from './dto/get-teleport.dto'

@Controller('teleport')
export class TeleportController {
  constructor(private readonly teleportService: TeleportService) {}

  @Post()
  create(@Body() createTeleportDto: CreateTeleportDto) {
    return this.teleportService.create(createTeleportDto)
  }

  @Get()
  findAll(@Query(new PaginatePipe()) params: GetTeleportDto) {
    return this.teleportService.findAll(params)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teleportService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeleportDto: UpdateTeleportDto) {
    return this.teleportService.update(id, updateTeleportDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teleportService.remove(id)
  }
}
