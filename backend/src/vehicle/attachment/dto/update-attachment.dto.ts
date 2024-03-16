import { PartialType } from '@nestjs/swagger'
import { CreateVehicleAttachmentDto } from './create-attachment.dto'

export class UpdateVehicleAttachmentDto extends PartialType(CreateVehicleAttachmentDto) {}
