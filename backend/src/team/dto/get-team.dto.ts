import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PaginateDto } from 'src/common/dtos/paginate.dto'

export class GetTeamDto extends PaginateDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  userId?: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  shortName?: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  fullName?: string
}
