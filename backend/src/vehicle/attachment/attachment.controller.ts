import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { VehicleAttachmentService } from './attachment.service'
import { CreateVehicleAttachmentDto } from './dto/create-attachment.dto'
import { UpdateVehicleAttachmentDto } from './dto/update-attachment.dto'
import { GetVehicleAttachmentDto } from './dto/get-attchment.dto'

@ApiTags('vehicle/attachment')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('vehicle/attachment')
export class VehicleAttachmentController {
  constructor(private readonly vehicleAttachmentsService: VehicleAttachmentService) {}

  @Post()
  create(@Body() createAttachmentDto: CreateVehicleAttachmentDto) {
    return this.vehicleAttachmentsService.create(createAttachmentDto)
  }

  @Get()
  findAll(@Query(new PaginatePipe()) query: GetVehicleAttachmentDto) {
    return this.vehicleAttachmentsService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleAttachmentsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttachmentDto: UpdateVehicleAttachmentDto) {
    return this.vehicleAttachmentsService.update(id, updateAttachmentDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleAttachmentsService.remove(id)
  }
}
