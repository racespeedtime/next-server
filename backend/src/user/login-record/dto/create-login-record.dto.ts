import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateUserLoginRecordDto {
  @IsString()
  @ApiProperty()
  ip: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  city: string

  @IsString()
  @ApiProperty()
  userId: string
}
