import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class SellAttireDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  attireUserId: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  vehicleAttireId: string
}
