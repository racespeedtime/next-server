import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PaginateDto } from 'src/common/dtos/paginate.dto'

export class GetRaceCpDto extends PaginateDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  raceId?: string
}
