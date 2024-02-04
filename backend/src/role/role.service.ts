import { Injectable } from '@nestjs/common'
import { FindManyOptions, In, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserService } from 'src/user/user.service'
import {
  conditionWhere,
  getConditionOmits,
} from 'src/common/utils/condition-where.utils'
import { RoleCode } from 'src/common/enums/role.enum'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { Role } from './entities/role.entity'
import { SetUserRolesDto } from './dto/set-user-roles.dto'
import { GetRolesDto } from './dto/get-roles.dto'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private userService: UserService,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    return this.roleRepository.save(createRoleDto)
  }

  async findAll(payload: GetRolesDto) {
    const queryParams: FindManyOptions<Role> = {
      where: conditionWhere({
        payload,
        mapping: { roleName: 'name', roleCode: 'code' },
        omits: getConditionOmits<GetRolesDto>('isAll'),
      }),

      order: {
        sort: 'desc',
      },
    }
    if (!payload.isAll) {
      queryParams.skip = payload.skip
      queryParams.take = payload.take
      const [list, total] = await this.roleRepository.findAndCount()
      return { list, total }
    }
    return this.roleRepository.find(queryParams)
  }

  findAllByIds(ids: string[]) {
    return this.roleRepository.find({ where: { id: In(ids) } })
  }

  async setUserRoles(userRoles: SetUserRolesDto) {
    const user = await this.userService.findOne(userRoles.userId)
    const roles = userRoles.roleIds
      ? await this.findAllByIds(userRoles.roleIds)
      : []
    user.roles = roles
    return this.userService.update(user, user)
  }

  findOne(id: string) {
    return this.roleRepository.findOneBy({ id })
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id)
    if (role.code === RoleCode.SUPER_ADMIN)
      throw new Error('超级管理员不能修改')

    const merged = this.roleRepository.merge(role, updateRoleDto)
    return this.roleRepository.save(merged)
  }

  async remove(id: string) {
    const role = await this.findOne(id)
    if (role.code === RoleCode.SUPER_ADMIN)
      throw new Error('超级管理员不能删除')

    return this.roleRepository.remove(role)
  }

  async batchRemove(ids: string[]) {
    const roles = await this.findAllByIds(ids)
    if (roles.some(role => role.code === RoleCode.SUPER_ADMIN))
      throw new Error('超级管理员不能删除')

    return this.roleRepository.remove(roles)
  }
}
