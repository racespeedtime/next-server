import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateHouseDto {
  @IsString()
  @ApiProperty()
  filePath: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description: string
}
