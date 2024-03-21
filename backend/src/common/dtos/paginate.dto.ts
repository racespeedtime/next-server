import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional, IsPositive, Max } from 'class-validator'

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
  @Transform(value => !!value)
  isAll: boolean

  // 内部使用
  skip: number
  take: number
}
