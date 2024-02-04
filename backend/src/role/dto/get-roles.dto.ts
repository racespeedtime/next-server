import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional, IsString } from 'class-validator'
import { PaginateDto } from 'src/common/dtos/paginate.dto'

export class GetRolesDto extends PaginateDto {
  @IsString()
  @IsOptional()
  roleName: string

  @IsString()
  @IsOptional()
  roleCode: string

  @Transform(value => !!value)
  @IsBoolean()
  @IsOptional()
  isAll: boolean
}
