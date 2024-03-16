import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { AttireUserService } from './user.service'
import { CreateAttireUserDto } from './dto/create-user.dto'
import { UpdateAttireUserDto } from './dto/update-user.dto'
import { GetAttireUserDto } from './dto/get-user.dto'

@ApiTags('attire/user')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('attire/user')
export class AttireUserController {
  constructor(private readonly userService: AttireUserService) {}

  @Post()
  create(@Body() createUserDto: CreateAttireUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get()
  findAll(@Query(new PaginatePipe()) params: GetAttireUserDto) {
    return this.userService.findAll(params)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateAttireUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id)
  }
}
