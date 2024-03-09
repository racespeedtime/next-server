import { PartialType } from '@nestjs/swagger'
import { CreateAttireDto } from './create-attire.dto'

export class UpdateAttireDto extends PartialType(CreateAttireDto) {}
