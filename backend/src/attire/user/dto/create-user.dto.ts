import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateAttireUserDto {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  boneId: number

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

  @IsString()
  @ApiProperty()
  attireId: string

  @IsString()
  @ApiProperty()
  userId: string
}
