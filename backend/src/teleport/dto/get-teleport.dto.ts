import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'
import { PaginateDto } from 'src/common/dtos/paginate.dto'

export class GetTeleportDto extends PaginateDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  userId?: string

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value === 'true')
  isSystem?: boolean

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value === 'true')
  isEnabled?: boolean

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  interiorId?: number

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name?: string
}
