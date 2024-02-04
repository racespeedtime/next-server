import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const code
      = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    let message = exception.message

    if (exception.response)
      message = exception.response.message

    if (exception instanceof UnauthorizedException)
      message = '用户未授权'

    message = message || 'Internal Server Error'

    response.status(HttpStatus.OK).json({
      code,
      message,
      stack: exception.stack.split('\n'),
    })
  }
}
