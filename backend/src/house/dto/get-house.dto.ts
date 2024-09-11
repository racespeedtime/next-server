import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PaginateDto } from 'src/common/dtos/paginate.dto'

export class GetHouseDto extends PaginateDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  userId?: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  relation?: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name?: string
}
