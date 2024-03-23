import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class BuyAttireDto {
  @IsString()
  @ApiProperty()
  attireId: string

  @IsString()
  @ApiProperty()
  userId: string
}
