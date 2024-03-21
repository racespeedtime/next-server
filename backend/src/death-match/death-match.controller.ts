import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { DeathMatchService } from './death-match.service'
import { CreateDeathMatchDto } from './dto/create-death-match.dto'
import { UpdateDeathMatchDto } from './dto/update-death-match.dto'
import { GetDeathMatchDto } from './dto/get-death-match.dto'

@ApiTags('death-match')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('death-match')
export class DeathMatchController {
  constructor(private readonly deathMatchService: DeathMatchService) {}

  @Post()
  create(@Body() createDeathMatchDto: CreateDeathMatchDto) {
    return this.deathMatchService.create(createDeathMatchDto)
  }

  @Get()
  findAll(@Query(new PaginatePipe()) query: GetDeathMatchDto) {
    return this.deathMatchService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deathMatchService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeathMatchDto: UpdateDeathMatchDto) {
    return this.deathMatchService.update(id, updateDeathMatchDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deathMatchService.remove(id)
  }
}
