import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { AttireType } from 'src/common/enums/attire.enum'

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

  @IsEnum(AttireType)
  @ApiProperty()
  type: AttireType
}
