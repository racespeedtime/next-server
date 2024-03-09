import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { SettingService } from './setting.service'
import { CreateSettingDto } from './dto/create-setting.dto'
import { UpdateSettingDto } from './dto/update-setting.dto'

@ApiTags('user/setting')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('user/setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Post()
  create(@Body() createSettingDto: CreateSettingDto) {
    return this.settingService.create(createSettingDto)
  }

  @Get()
  findAll() {
    return this.settingService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.settingService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
    return this.settingService.update(+id, updateSettingDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.settingService.remove(+id)
  }
}
