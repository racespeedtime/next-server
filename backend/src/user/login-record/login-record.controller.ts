import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { UserLoginRecordService } from './login-record.service'
import { CreateUserLoginRecordDto } from './dto/create-login-record.dto'
import { UpdateUserLoginRecordDto } from './dto/update-login-record.dto'
import { GetUserLoginRecordDto } from './dto/get-login-record.dto'

@ApiTags('user/login-record')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('user/login-record')
export class UserLoginRecordController {
  constructor(private readonly userLoginRecordService: UserLoginRecordService) {}

  @Post()
  create(@Body() createLoginRecordDto: CreateUserLoginRecordDto) {
    return this.userLoginRecordService.create(createLoginRecordDto)
  }

  @Get()
  findAll(@Query(new PaginatePipe()) query: GetUserLoginRecordDto) {
    return this.userLoginRecordService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userLoginRecordService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginRecordDto: UpdateUserLoginRecordDto) {
    return this.userLoginRecordService.update(id, updateLoginRecordDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLoginRecordService.remove(id)
  }
}
