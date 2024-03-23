import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Serialize } from 'src/common/decorators/serialize.decorator'
import { ResponseMessage } from 'src/common/decorators/response-message.decorator'
import { LocalIpGuard } from 'src/common/guards/local-ip.guard'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { ResponseLoginDto } from './dto/response-login.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Serialize(ResponseLoginDto)
  @Post('login')
  @ApiOperation({ summary: '登录' })
  @ResponseMessage('登录成功')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }

  @Post('register')
  @ApiOperation({ summary: '注册' })
  register(@Body() dto: LoginDto) {
    return this.authService.register(dto)
  }

  @Get('serverToken')
  @ApiOperation({ summary: '服务器自用token,内网穿透下请不要使用' })
  @Serialize(ResponseLoginDto)
  @UseGuards(LocalIpGuard)
  serverToken() {
    return this.authService.serverToken()
  }
}
