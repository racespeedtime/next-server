import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { CpService } from './cp.service'
import { CreateCpDto } from './dto/create-cp.dto'
import { UpdateCpDto } from './dto/update-cp.dto'

@ApiTags('race/cp')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('race/cp')
export class CpController {
  constructor(private readonly cpService: CpService) {}

  @Post()
  create(@Body() createCpDto: CreateCpDto) {
    return this.cpService.create(createCpDto)
  }

  @Get()
  findAll() {
    return this.cpService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cpService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCpDto: UpdateCpDto) {
    return this.cpService.update(+id, updateCpDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cpService.remove(+id)
  }
}
