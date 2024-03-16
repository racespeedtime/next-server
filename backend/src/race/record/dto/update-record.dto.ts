import { PartialType } from '@nestjs/swagger'
import { CreateRaceRecordDto } from './create-record.dto'

export class UpdateRaceRecordDto extends PartialType(CreateRaceRecordDto) {}
