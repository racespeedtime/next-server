import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class BuyAttireDto {
  @IsString()
  @ApiProperty()
  attireId: string

  @IsString()
  @ApiProperty()
  userId: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  vehicleId?: string
}
