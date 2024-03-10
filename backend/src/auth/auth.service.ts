import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userService.checkUserPassword(dto)
    if (!user)
      throw new BadRequestException('无效的用户名或密码')

    const token = await this.jwtService.signAsync({
      id: user.id,
      roles: user.roles,
      username: user.username,
    })
    return { token, user }
  }

  async register(dto: LoginDto) {
    return this.userService.create(dto)
  }

  async serverToken(req: Request) {
    const xForwardedFor = req.headers['x-forwarded-for'] as (string | undefined)
    const xRealIp = req.headers['x-real-ip'] as (string | undefined)

    let ip = xForwardedFor || xRealIp || req.socket.remoteAddress || req.ip

    if (!ip)
      throw new UnauthorizedException('获取ip失败')

    if (ip.startsWith('::ffff:'))
      ip = ip.substring(7)

    if (!['127.0.0.1', 'localhost', '::1'].includes(ip))
      throw new UnauthorizedException('非本地ip无法访问')

    const user = await this.userService.findOneByUserName('admin')
    if (!user)
      throw new BadRequestException('系统内置超级管理员丢失')

    const token = await this.jwtService.signAsync({
      id: user.id,
      roles: user.roles,
      username: user.username,
    })
    return token
  }
}
