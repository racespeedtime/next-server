import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { GoodsService } from './goods.service'
import { CreateGoodDto } from './dto/create-good.dto'
import { UpdateGoodDto } from './dto/update-good.dto'

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
  findAll() {
    return this.goodsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goodsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoodDto: UpdateGoodDto) {
    return this.goodsService.update(+id, updateGoodDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goodsService.remove(+id)
  }
}
