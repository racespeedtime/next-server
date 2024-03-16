import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsString } from 'class-validator'

export class CreateUserBanDto {
  @IsDate()
  @ApiProperty()
  endAt: Date

  @IsString()
  @ApiProperty()
  reason: string

  @IsString()
  @ApiProperty()
  userId: string
}
