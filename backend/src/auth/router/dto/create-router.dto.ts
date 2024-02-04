import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { RouterTypeArray } from 'src/common/enums/router.enum'

export class CreateRouterDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  path: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  component: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  redirect: string

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  sort: number

  @IsIn(RouterTypeArray)
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  type: number

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  button: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  icon: string

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  localIcon: boolean

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description: string

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  show: boolean

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  keepAlive: boolean

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  affixTag: boolean

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  breadCrumb: boolean

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  alwaysShow: boolean

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  parentId: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  link: string
}
