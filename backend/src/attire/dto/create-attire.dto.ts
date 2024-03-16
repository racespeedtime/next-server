import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateAttireDto {
  @IsString()
  @ApiProperty()
  name: string

  @IsNumber()
  @ApiProperty()
  modelId: number

  @IsNumber()
  @ApiProperty()
  boneId: number

  @IsNumber()
  @ApiProperty()
  price: number

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
  rX: number

  @IsNumber()
  @ApiProperty()
  rY: number

  @IsNumber()
  @ApiProperty()
  rZ: number

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  sX: number

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  sY: number

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  sZ: number
}
