import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { LoginDto } from 'src/auth/dto/login.dto'
import * as bcrypt from 'bcrypt'
import { RoleCode } from 'src/common/enums/role.enum'
import {
  conditionWhere,
  getConditionOmits,
} from 'src/common/utils/condition-where.utils'
import { GetUserDto } from './dto/get-user.dto'
import { User } from './entities/user.entity'
import { UpdateUserDto } from './dto/update-user.dto'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    if (await this.findOneByUserName(dto.username))
      throw new BadRequestException('用户名已存在')

    const salt = await bcrypt.genSalt()
    const password = await bcrypt.hash(dto.password, salt)
    return this.userRepository.save({ ...dto, password })
  }

  async findAll(payload: GetUserDto) {
    const [list, total] = await this.userRepository.findAndCount({
      where: {
        deletedAt: null,
        ...conditionWhere({
          payload,
          omits: getConditionOmits<GetUserDto>(),
        }),
      },
      relations: { roles: true },
      skip: payload.skip,
      take: payload.take,
      order: {
        createdAt: 'DESC',
      },
    })
    return { list, total }
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id, deletedAt: null },
      relations: {
        roles: true,
      },
    })
    if (!user)
      throw new BadRequestException('用户不存在')
    return user
  }

  async update(user: string | User, updateUserDto: UpdateUserDto) {
    let userEntity = user
    if (typeof user === 'string') {
      userEntity = await this.findOne(user)
      const merged = this.userRepository.merge(
        userEntity as User,
        updateUserDto,
      )
      return this.userRepository.save(merged)
    }
    return this.userRepository.save(user)
  }

  async remove(id: string) {
    const user = await this.findOne(id)
    if (user.roles?.some(r => r.code === RoleCode.SUPER_ADMIN))
      throw new BadRequestException('超级管理员不能删除')

    return this.userRepository.softRemove(user)
  }

  async batchRemove(ids: string[]) {
    const users = await this.userRepository.find({
      where: { id: In(ids) },
      relations: { roles: true },
    })
    if (!users.length)
      throw new BadRequestException('用户不存在')

    const hasAdminUser = users
      .filter(user => this.isAdmin(user))
      .map(user => user.username)
    if (hasAdminUser.length) {
      throw new BadRequestException(
        `超级管理员${hasAdminUser.toString()}不能删除`,
      )
    }
    return this.userRepository.softRemove(users)
  }

  async checkUserPassword(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        username: dto.username,
        deletedAt: null,
      },
      relations: {
        roles: true,
      },
    })
    if (!user)
      return null

    const isSuccess = await bcrypt.compare(dto.password, user.password)
    if (!isSuccess)
      return null
    return user
  }

  async findOneByUserName(username: string) {
    const user = await this.userRepository.findOne({
      where: { username, deletedAt: null },
      relations: {
        roles: true,
      },
    })
    return user
  }

  isSelf(id: string, user: User) {
    if (!user)
      return false
    return id === user.id
  }

  isAdmin(user: User) {
    if (!user)
      return false
    return user.roles?.some(r => r.code === RoleCode.SUPER_ADMIN)
  }

  isSelfOrAdmin(id: string, user: User) {
    return this.isSelf(id, user) || this.isAdmin(user)
  }
}
