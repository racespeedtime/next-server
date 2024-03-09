import { PartialType } from '@nestjs/swagger'
import { CreateCpDto } from './create-cp.dto'

export class UpdateCpDto extends PartialType(CreateCpDto) {}
