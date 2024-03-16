import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateUserSettingDto {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  skinId: number

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  timeMinute: number

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  timeHour: number

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  weather: number

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  prefix: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  suffix: string

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  Invincible: boolean

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  vehicleFlip: boolean

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  vehicleAutoFix: boolean

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  vehicleNoCollision: boolean

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  showObject: boolean

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  showSpeed: boolean

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  showNetstat: boolean

  @IsString()
  @ApiProperty()
  userId: string
}
