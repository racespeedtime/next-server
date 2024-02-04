import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class FindRolesRoutesDto {
  @ApiPropertyOptional()
  @IsString({ each: true })
  @IsOptional()
  roleIds: string[]
}
