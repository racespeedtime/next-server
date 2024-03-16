import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CreateRaceCpDto {
  @IsNumber()
  @ApiProperty()
  checkpoint: number

  @IsNumber()
  @ApiProperty()
  x: number

  @IsNumber()
  @ApiProperty()
  y: number

  @IsNumber()
  @ApiProperty()
  z: number

  @IsNumber()
  @ApiProperty()
  angle: number

  @IsNumber()
  @ApiProperty()
  size: number

  @IsString()
  @ApiProperty()
  raceId: string
}
