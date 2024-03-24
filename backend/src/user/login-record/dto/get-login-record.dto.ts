import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PaginateDto } from 'src/common/dtos/paginate.dto'

export class GetUserLoginRecordDto extends PaginateDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  userId?: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  ip?: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  city?: string
}
