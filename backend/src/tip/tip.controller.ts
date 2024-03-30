import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { Roles } from 'src/common/decorators/roles.decorator'
import { RoleCode } from 'src/common/enums/role.enum'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { TipService } from './tip.service'
import { CreateTipDto } from './dto/create-tip.dto'
import { UpdateTipDto } from './dto/update-tip.dto'
import { GetTipDto } from './dto/get-tip.dto'

@ApiTags('tip')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('tip')
export class TipController {
  constructor(private readonly tipService: TipService) {}

  @Roles(RoleCode.SUPER_ADMIN)
  @Post()
  create(@Body() createTipDto: CreateTipDto) {
    return this.tipService.create(createTipDto)
  }

  @Get()
  findAll(@Query(new PaginatePipe()) query: GetTipDto) {
    return this.tipService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipService.findOne(id)
  }

  @Roles(RoleCode.SUPER_ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHostnameDto: UpdateTipDto) {
    return this.tipService.update(id, updateHostnameDto)
  }

  @Roles(RoleCode.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipService.remove(id)
  }
}
