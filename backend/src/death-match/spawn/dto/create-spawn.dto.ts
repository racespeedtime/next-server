import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CreateDeathMatchSpawnDto {
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

  @IsString()
  @ApiProperty()
  deathMatchId: string
}
