import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional, IsString } from 'class-validator'
import { PaginateDto } from 'src/common/dtos/paginate.dto'

export class GetQuestionDto extends PaginateDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name?: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  answer?: string

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value === 'true')
  isEnabled?: boolean
}
