import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { Roles } from 'src/common/decorators/roles.decorator'
import { RoleCode } from 'src/common/enums/role.enum'
import { HostnameService } from './hostname.service'
import { CreateHostnameDto } from './dto/create-hostname.dto'
import { UpdateHostnameDto } from './dto/update-hostname.dto'
import { GetHostnameDto } from './dto/get-hostname.dto'

@ApiTags('hostname')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('hostname')
export class HostnameController {
  constructor(private readonly hostnameService: HostnameService) {}

  @Roles(RoleCode.SUPER_ADMIN)
  @Post()
  create(@Body() createHostnameDto: CreateHostnameDto) {
    return this.hostnameService.create(createHostnameDto)
  }

  @Get()
  findAll(@Query(new PaginatePipe()) query: GetHostnameDto) {
    return this.hostnameService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hostnameService.findOne(id)
  }

  @Roles(RoleCode.SUPER_ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHostnameDto: UpdateHostnameDto) {
    return this.hostnameService.update(id, updateHostnameDto)
  }

  @Roles(RoleCode.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hostnameService.remove(id)
  }
}
