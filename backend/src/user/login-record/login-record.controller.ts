import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { LoginRecordService } from './login-record.service'
import { CreateLoginRecordDto } from './dto/create-login-record.dto'
import { UpdateLoginRecordDto } from './dto/update-login-record.dto'

@ApiTags('user/login-record')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('user/login-record')
export class LoginRecordController {
  constructor(private readonly loginRecordService: LoginRecordService) {}

  @Post()
  create(@Body() createLoginRecordDto: CreateLoginRecordDto) {
    return this.loginRecordService.create(createLoginRecordDto)
  }

  @Get()
  findAll() {
    return this.loginRecordService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginRecordService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginRecordDto: UpdateLoginRecordDto) {
    return this.loginRecordService.update(+id, updateLoginRecordDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginRecordService.remove(+id)
  }
}
