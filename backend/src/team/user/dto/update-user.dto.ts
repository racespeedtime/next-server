import { PartialType } from '@nestjs/swagger'
import { CreateTeamUserDto } from './create-user.dto'

export class UpdateTeamUserDto extends PartialType(CreateTeamUserDto) {}
