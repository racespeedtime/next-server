import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class CreateRaceDto {
  @IsString()
  @ApiProperty()
  name: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description: string

  @IsString()
  @ApiProperty()
  userId: string

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  isEnabled: boolean

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  houseId: string
}
