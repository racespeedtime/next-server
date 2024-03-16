import { PartialType } from '@nestjs/swagger'
import { CreateUserSettingDto } from './create-setting.dto'

export class UpdateUserSettingDto extends PartialType(CreateUserSettingDto) {}
