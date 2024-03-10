import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { BanService } from './ban.service'
import { CreateBanDto } from './dto/create-ban.dto'
import { UpdateBanDto } from './dto/update-ban.dto'

@ApiTags('user/ban')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('user/ban')
export class BanController {
  constructor(private readonly banService: BanService) {}

  @Post()
  create(@Body() createBanDto: CreateBanDto) {
    return this.banService.create(createBanDto)
  }

  @Get()
  findAll() {
    return this.banService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.banService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBanDto: UpdateBanDto) {
    return this.banService.update(+id, updateBanDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.banService.remove(+id)
  }
}
