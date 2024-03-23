import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PaginateDto } from 'src/common/dtos/paginate.dto'

export class GetHouseModelDto extends PaginateDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  houseId: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  type: string
}
