import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateRaceCpScriptDto {
  @IsString()
  @ApiProperty()
  script: string

  @IsString()
  @ApiProperty()
  raceId: string

  @IsString()
  @ApiProperty()
  checkpointId: string
}
