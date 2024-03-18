import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator'
import { HouseRelation } from 'src/common/enums/house.enum'

export class CreateHouseDto {
  @IsString()
  @ApiProperty()
  name: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description: string

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  isEnabled: boolean

  @IsEnum(HouseRelation)
  @IsOptional()
  @ApiPropertyOptional()
  relation: HouseRelation
}
