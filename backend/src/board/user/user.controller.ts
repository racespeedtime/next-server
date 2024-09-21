import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { BoardUserService } from './user.service'
import { CreateBoardUserDto } from './dto/create-user.dto'
import { UpdateBoardUserDto } from './dto/update-user.dto'
import { GetBoardUserDto } from './dto/get-user.dto'

@ApiTags('board')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('board')
export class BoardUserController {
  constructor(private readonly boardService: BoardUserService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardUserDto) {
    return this.boardService.create(createBoardDto)
  }

  @Get()
  findAll(@Query(new PaginatePipe()) query: GetBoardUserDto) {
    return this.boardService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardUserDto) {
    return this.boardService.update(id, updateBoardDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(id)
  }
}
