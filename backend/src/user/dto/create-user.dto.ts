import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @Length(1, 16)
  @ApiProperty()
  username: string

  @IsString()
  @Length(1, 16)
  @ApiProperty()
  password: string
}
