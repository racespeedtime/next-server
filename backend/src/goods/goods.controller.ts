import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { GoodsService } from './goods.service'
import { CreateGoodDto } from './dto/create-good.dto'
import { UpdateGoodDto } from './dto/update-good.dto'
import { GetGoodsDto } from './dto/get-goods.dto'

@ApiTags('goods')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Post()
  create(@Body() createGoodDto: CreateGoodDto) {
    return this.goodsService.create(createGoodDto)
  }

  @Get()
  findAll(@Query(new PaginatePipe()) query: GetGoodsDto) {
    return this.goodsService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goodsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoodDto: UpdateGoodDto) {
    return this.goodsService.update(id, updateGoodDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goodsService.remove(id)
  }
}
