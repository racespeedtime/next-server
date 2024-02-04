import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { RoleCode } from 'src/common/enums/role.enum'
import { User } from 'src/user/entities/user.entity'

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = new Reflector().getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ])
    const { user } = context.switchToHttp().getRequest()

    if (!roles)
      return true

    const hasRole = roles.some(code =>
      (user as User).roles.some(
        r => r.code === code || r.code === RoleCode.SUPER_ADMIN,
      ),
    )

    if (!hasRole)
      throw new ForbiddenException('不可越权操作')
    return true
  }
}
