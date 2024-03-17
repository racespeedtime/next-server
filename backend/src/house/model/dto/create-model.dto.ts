import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateHouseModelDto {
  @IsString()
  @ApiProperty()
  type: string

  @IsString()
  @ApiProperty()
  args: string

  @IsString()
  @ApiProperty()
  houseId: string
}
