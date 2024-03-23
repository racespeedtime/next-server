import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PaginateDto } from 'src/common/dtos/paginate.dto'

export class GetTeamUserDto extends PaginateDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  teamId: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  userId?: string
}
