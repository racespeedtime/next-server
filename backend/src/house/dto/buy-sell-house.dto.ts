import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class BuySellHouseDto {
  @IsString()
  @ApiProperty()
  houseId: string

  @IsString()
  @ApiProperty()
  userId: string
}
