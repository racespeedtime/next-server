import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class UpdateUserDto {
  @IsString()
  @Length(1, 16)
  @ApiProperty()
  username: string
}
