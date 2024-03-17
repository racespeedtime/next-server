import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class CreateQuestionDto {
  @IsString()
  @ApiProperty()
  name: string

  @IsString()
  @ApiProperty()
  answer: string

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  isEnabled: boolean

  @IsString()
  @ApiProperty()
  userId: string
}
