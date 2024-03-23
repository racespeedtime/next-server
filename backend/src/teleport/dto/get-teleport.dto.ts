import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'
import { PaginateDto } from 'src/common/dtos/paginate.dto'

export class GetTeleportDto extends PaginateDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  userId?: string

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  isSystem?: boolean

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  isEnabled?: boolean
}
