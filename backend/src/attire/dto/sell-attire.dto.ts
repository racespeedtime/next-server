import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class SellAttireDto {
  @IsString()
  @ApiProperty()
  attireUserId: string
}
