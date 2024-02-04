import { BadRequestException, Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { JwtService } from '@nestjs/jwt'
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
}
