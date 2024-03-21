import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { Serialize } from 'src/common/decorators/serialize.decorator'
import { AttireUserService } from './user.service'
import { CreateAttireUserDto } from './dto/create-user.dto'
import { UpdateAttireUserDto } from './dto/update-user.dto'
import { GetAttireUserDto } from './dto/get-user.dto'
import { FindAttireUserDto } from './dto/find-user.dto'

@ApiTags('attire/user')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('attire/user')
export class AttireUserController {
  constructor(private readonly attireUserService: AttireUserService) {}

  @Post()
  create(@Body() createUserDto: CreateAttireUserDto) {
    return this.attireUserService.create(createUserDto)
  }

  @Get()
  @Serialize(FindAttireUserDto)
  findAll(@Query(new PaginatePipe()) query: GetAttireUserDto) {
    return this.attireUserService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attireUserService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateAttireUserDto) {
    return this.attireUserService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attireUserService.remove(id)
  }
}
