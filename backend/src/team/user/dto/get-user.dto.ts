import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional, IsString } from 'class-validator'
import { PaginateDto } from 'src/common/dtos/paginate.dto'

export class GetTeamUserDto extends PaginateDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  teamId?: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  userId?: string

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value === 'true')
  isAdmin?: boolean
}
