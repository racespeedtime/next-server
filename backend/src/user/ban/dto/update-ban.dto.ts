import { PartialType } from '@nestjs/swagger'
import { CreateUserBanDto } from './create-ban.dto'

export class UpdateUserBanDto extends PartialType(CreateUserBanDto) {}
