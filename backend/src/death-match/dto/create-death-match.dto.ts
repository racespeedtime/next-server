import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateDeathMatchDto {
  @IsString()
  @ApiProperty()
  name: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description: string

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  isEnabled: boolean

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  interiorId: number

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  houseId: string
}
