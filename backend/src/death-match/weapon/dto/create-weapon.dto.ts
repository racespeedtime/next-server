import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CreateDeathMatchWeaponDto {
  @IsNumber()
  @ApiProperty()
  modelId: number

  @IsString()
  @ApiProperty()
  deathMatchId: string
}
