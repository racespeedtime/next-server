import { IsNotEmpty, IsString } from 'class-validator'

export class SetUserRolesDto {
  @IsNotEmpty()
  @IsString({ each: true })
  roleIds: string[]

  @IsNotEmpty()
  @IsString()
  userId: string
}
