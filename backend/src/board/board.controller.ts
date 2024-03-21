import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { BoardService } from './board.service'
import { CreateBoardDto } from './dto/create-board.dto'
import { UpdateBoardDto } from './dto/update-board.dto'
import { GetBoardDto } from './dto/get-board.dto'

@ApiTags('board')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto)
  }

  @Get()
  findAll(@Query(new PaginatePipe()) query: GetBoardDto) {
    return this.boardService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(id, updateBoardDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(id)
  }
}
