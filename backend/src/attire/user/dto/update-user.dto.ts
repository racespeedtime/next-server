import { PartialType } from '@nestjs/swagger'
import { CreateAttireUserDto } from './create-user.dto'

export class UpdateAttireUserDto extends PartialType(CreateAttireUserDto) {}
