import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { AttireService } from './attire.service'
import { CreateAttireDto } from './dto/create-attire.dto'
import { UpdateAttireDto } from './dto/update-attire.dto'
import { GetAttireDto } from './dto/get-attire.dto'
import { BuyAttireDto } from './dto/buy-attire.dto'
import { SellAttireDto } from './dto/sell-attire.dto'

@ApiTags('attire')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('attire')
export class AttireController {
  constructor(private readonly attireService: AttireService) {}

  @Post()
  create(@Body() createAttireDto: CreateAttireDto) {
    return this.attireService.create(createAttireDto)
  }

  @Get()
  findAll(@Query(new PaginatePipe()) query: GetAttireDto) {
    return this.attireService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attireService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttireDto: UpdateAttireDto) {
    return this.attireService.update(id, updateAttireDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attireService.remove(id)
  }

  @Post('buy')
  buy(@Body() buyHouseDto: BuyAttireDto) {
    return this.attireService.buy(buyHouseDto)
  }

  @Post('sell')
  sell(@Body() sellHouseDto: SellAttireDto) {
    return this.attireService.sell(sellHouseDto)
  }
}
