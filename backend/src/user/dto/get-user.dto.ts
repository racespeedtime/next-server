import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import { PaginateDto } from 'src/common/dtos/paginate.dto'

export class GetUserDto extends PaginateDto {
  @ApiPropertyOptional()
  @IsOptional()
  username?: string
}
