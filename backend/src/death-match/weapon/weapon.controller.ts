import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { DeathMatchWeaponService } from './weapon.service'
import { CreateDeathMatchWeaponDto } from './dto/create-weapon.dto'
import { UpdateDeathMatchWeaponDto } from './dto/update-weapon.dto'
import { GetDeathMatchWeaponDto } from './dto/get-weapon.dto'

@ApiTags('death-match/weapon')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('death-match/weapon')
export class DeathMatchWeaponController {
  constructor(private readonly deathMatchWeaponService: DeathMatchWeaponService) {}

  @Post()
  create(@Body() createDeathMatchWeaponDto: CreateDeathMatchWeaponDto) {
    return this.deathMatchWeaponService.create(createDeathMatchWeaponDto)
  }

  @Get()
  findAll(@Query(new PaginatePipe()) query: GetDeathMatchWeaponDto) {
    return this.deathMatchWeaponService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deathMatchWeaponService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeathMatchWeaponDto: UpdateDeathMatchWeaponDto) {
    return this.deathMatchWeaponService.update(id, updateDeathMatchWeaponDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deathMatchWeaponService.remove(id)
  }
}
