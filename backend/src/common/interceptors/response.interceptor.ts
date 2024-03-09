import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable, map } from 'rxjs'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const reflectMessage = this.reflector.get<string>(
      'message',
      context.getHandler(),
    )
    const message = reflectMessage || 'OK'

    return next.handle().pipe(map(data => ({ code: 0, data, message })))
  }
}
