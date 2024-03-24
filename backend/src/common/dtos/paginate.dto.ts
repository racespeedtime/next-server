import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsBoolean, IsDateString, IsOptional, IsPositive, Max } from 'class-validator'

export class PaginateDto {
  @ApiPropertyOptional()
  @IsPositive()
  @Transform(({ value }) => +value)
  @IsOptional()
  pageNum?: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  @Max(100)
  @Transform(({ value }) => +value)
  pageSize?: number

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  isAll?: boolean

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional()
  createdAtStart?: Date

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional()
  createdAtEnd?: Date

  // 内部使用
  skip?: number
  take?: number
}
