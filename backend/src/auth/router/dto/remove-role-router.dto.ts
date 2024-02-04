import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class RoleRouterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  roleId: string

  @IsString({ each: true })
  @IsNotEmpty()
  @ApiProperty()
  routerIds: string[]
}
