import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsOptional, IsPositive, Max } from 'class-validator'

export class PaginateDto {
  @ApiPropertyOptional()
  @IsPositive()
  @Transform(({ value }) => +value)
  @IsOptional()
  pageNum?: number

  @ApiPropertyOptional()
  @Max(100)
  @IsPositive()
  @Transform(({ value }) => +value)
  @IsOptional()
  pageSize?: number

  // 内部使用
  skip: number
  take: number
}
