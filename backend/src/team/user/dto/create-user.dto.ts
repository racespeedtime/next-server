import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'

export class CreateTeamUserDto {
  @IsBoolean()
  @ApiProperty()
  isAdmin: boolean

  @IsString()
  @ApiProperty()
  teamId: string

  @IsString()
  @ApiProperty()
  userId: string
}
