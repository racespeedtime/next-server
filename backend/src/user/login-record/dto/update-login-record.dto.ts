import { PartialType } from '@nestjs/swagger'
import { CreateUserLoginRecordDto } from './create-login-record.dto'

export class UpdateUserLoginRecordDto extends PartialType(CreateUserLoginRecordDto) {}
