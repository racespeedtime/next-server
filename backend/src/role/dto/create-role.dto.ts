import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  isEnabled: boolean

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  sort: number

  @MaxLength(200)
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  remark: string
}
