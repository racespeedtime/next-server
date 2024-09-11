import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PaginateDto } from 'src/common/dtos/paginate.dto'

export class GetRolesDto extends PaginateDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  roleName: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  roleCode: string
}
