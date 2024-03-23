import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'

@Injectable()
export class LocalIpGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>()

    const xForwardedFor = req.headers['x-forwarded-for'] as (string | undefined)
    const xRealIp = req.headers['x-real-ip'] as (string | undefined)

    let ip = xForwardedFor || xRealIp || req.socket.remoteAddress || req.ip

    if (!ip)
      throw new UnauthorizedException('获取ip失败')

    if (ip.startsWith('::ffff:'))
      ip = ip.substring(7)

    if (!['127.0.0.1', 'localhost', '::1'].includes(ip))
      throw new UnauthorizedException('非本地ip无法访问')

    return true
  }
}
