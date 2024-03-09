import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { AttachmentsService } from './attachments.service'
import { CreateAttachmentDto } from './dto/create-attachment.dto'
import { UpdateAttachmentDto } from './dto/update-attachment.dto'

@ApiTags('vehicle/attachments')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('vehicle/attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post()
  create(@Body() createAttachmentDto: CreateAttachmentDto) {
    return this.attachmentsService.create(createAttachmentDto)
  }

  @Get()
  findAll() {
    return this.attachmentsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attachmentsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttachmentDto: UpdateAttachmentDto) {
    return this.attachmentsService.update(+id, updateAttachmentDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attachmentsService.remove(+id)
  }
}
