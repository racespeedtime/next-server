import { SetMetadata } from '@nestjs/common'
import { RoleCode } from 'src/common/enums/role.enum'

export const Roles = (...args: RoleCode[]) => SetMetadata('roles', args)
