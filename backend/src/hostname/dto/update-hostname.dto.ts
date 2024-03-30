import { PartialType } from '@nestjs/swagger'
import { CreateHostnameDto } from './create-hostname.dto'

export class UpdateHostnameDto extends PartialType(CreateHostnameDto) {}
