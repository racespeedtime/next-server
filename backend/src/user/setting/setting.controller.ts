import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { UserSettingService } from './setting.service'
import { CreateUserSettingDto } from './dto/create-setting.dto'
import { UpdateUserSettingDto } from './dto/update-setting.dto'
import { GetUserSettingDto } from './dto/get-setting.dto'

@ApiTags('user/setting')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('user/setting')
export class UserSettingController {
  constructor(private readonly settingService: UserSettingService) {}

  @Post()
  create(@Body() createSettingDto: CreateUserSettingDto) {
    return this.settingService.create(createSettingDto)
  }

  @Get()
  findAll(@Query(new PaginatePipe()) query: GetUserSettingDto) {
    return this.settingService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.settingService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSettingDto: UpdateUserSettingDto) {
    return this.settingService.update(id, updateSettingDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.settingService.remove(id)
  }
}
