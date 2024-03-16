import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateVehicleDto {
  @IsNumber()
  @ApiProperty()
  modelId: number

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
  @IsOptional()
  @ApiPropertyOptional()
  color1: number

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  color2: number

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  worldId: number

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  interiorId: number

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  isLocked: boolean

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  price: number

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  paintjob: number

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  plateNumber: string

  @IsString()
  @ApiProperty()
  userId: string
}
