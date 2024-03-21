import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'
import { Column } from 'typeorm'

export class CreateBoardDto {
  @IsNumber()
  @ApiProperty()
  modelId: number

  @IsString()
  @ApiProperty()
  text: string

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  materialIndex: number

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  materialSize: number

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  fontFace: string

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  fontSize: number

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  bold: boolean

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  color: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  bgColor: string

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  align: number

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

  @IsString()
  @IsOptional()
  userId: string
}
