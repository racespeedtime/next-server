import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PaginateDto } from 'src/common/dtos/paginate.dto'

export class GetUserSettingDto extends PaginateDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  userId?: string
}
