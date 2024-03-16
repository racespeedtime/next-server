import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateGoodDto {
  @IsString()
  @ApiProperty()
  name: string

  @IsNumber()
  @ApiProperty()
  modelId: number

  @IsBoolean()
  @ApiProperty()
  isSale: boolean

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
  worldId: number

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  interiorId: number
}
