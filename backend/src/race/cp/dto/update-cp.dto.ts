import { PartialType } from '@nestjs/swagger'
import { CreateRaceCpDto } from './create-cp.dto'

export class UpdateRaceCpDto extends PartialType(CreateRaceCpDto) {}
