import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateTeleportDto {
  @IsString()
  @ApiProperty()
  name: string

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
  @IsOptional()
  @ApiPropertyOptional()
  description: string

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  isSystem: boolean

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  isEnabled: boolean

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  interiorId: number

  @IsString()
  @ApiProperty()
  userId: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  houseId: string
}
