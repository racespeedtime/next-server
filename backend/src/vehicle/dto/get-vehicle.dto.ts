import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'
import { PaginateDto } from 'src/common/dtos/paginate.dto'

export class GetVehicleDto extends PaginateDto {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => +value)
  modelId?: number

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => +value)
  worldId?: number

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => +value)
  interiorId?: number

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value === 'true')
  isLocked?: boolean

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description?: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  plateNumber?: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  userId?: string
}
