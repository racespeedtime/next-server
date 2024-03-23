import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PaginateDto } from 'src/common/dtos/paginate.dto'

export class GetRaceCpScriptDto extends PaginateDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  raceId?: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  checkpointId?: string
}
