import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateTeamDto {
  @IsString()
  @ApiProperty()
  shortName: string

  @IsString()
  @ApiProperty()
  fullName: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description: string

  @IsString()
  @ApiProperty()
  userId: string
}
