import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { UserBanService } from './ban.service'
import { CreateUserBanDto } from './dto/create-ban.dto'
import { UpdateUserBanDto } from './dto/update-ban.dto'
import { GetUserBanDto } from './dto/get-ban.dto'

@ApiTags('user/ban')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('user/ban')
export class UserBanController {
  constructor(private readonly userBanService: UserBanService) {}

  @Post()
  create(@Body() createUserBanDto: CreateUserBanDto) {
    return this.userBanService.create(createUserBanDto)
  }

  @Get()
  findAll(@Query(new PaginatePipe()) params: GetUserBanDto) {
    return this.userBanService.findAll(params)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userBanService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserBanDto: UpdateUserBanDto) {
    return this.userBanService.update(id, updateUserBanDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userBanService.remove(id)
  }
}
