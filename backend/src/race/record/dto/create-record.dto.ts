import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CreateRaceRecordDto {
  @IsNumber()
  @ApiProperty()
  record: number

  @IsString()
  @ApiProperty()
  raceId: string

  @IsString()
  @ApiProperty()
  userId: string
}
