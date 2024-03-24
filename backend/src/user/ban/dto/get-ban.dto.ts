import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PaginateDto } from 'src/common/dtos/paginate.dto'

export class GetUserBanDto extends PaginateDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  reason?: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  userId?: string
}
