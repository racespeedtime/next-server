import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { RoleService } from 'src/role/role.service'
import { RoleCode } from 'src/common/enums/role.enum'
import { CreateRouterDto } from './dto/create-router.dto'
import { UpdateRouterDto } from './dto/update-router.dto'
import { Router } from './entities/router.entity'
import { RoleRouterDto } from './dto/remove-role-router.dto'

@Injectable()
export class RouterService {
  constructor(
    @InjectRepository(Router) private routerRepository: Repository<Router>,
    private roleService: RoleService,
  ) {}

  async create(createRouterDto: CreateRouterDto) {
    return this.routerRepository.save(createRouterDto)
  }

  findAll() {
    return this.routerRepository.find()
  }

  findOne(id: string) {
    return this.routerRepository.findOneBy({ id })
  }

  async update(id: string, updateRouterDto: UpdateRouterDto) {
    const router = await this.findOne(id)

    if (!router)
      throw new BadRequestException('Router not found')

    if (updateRouterDto.parentId) {
      if (updateRouterDto.parentId === router.id)
        throw new BadRequestException('Cannot set parent to self')

      const parent = await this.findOne(updateRouterDto.parentId)
      if (!parent)
        throw new BadRequestException('Parent not found')
    }

    const merged = this.routerRepository.merge(router, updateRouterDto)
    return this.routerRepository.save(merged)
  }

  async remove(id: string) {
    const router = await this.findOne(id)
    if (!router)
      throw new BadRequestException('Router not found')

    const children = (await this.findChildren(id)) || []

    return this.routerRepository.remove([router, ...children])
  }

  findChildren(parentId: string) {
    return this.routerRepository.find({
      where: { parentId },
    })
  }

  findRolesRoutes() {
    return this.routerRepository.find({ relations: { roles: true } })
  }

  findRoutesByRoleIds(roleIds?: string[]) {
    const qb = this.routerRepository.createQueryBuilder('router')
    if (roleIds && roleIds.length) {
      qb.leftJoin('router.roles', 'roles')
      qb.where('roles.id In (:...roleIds)', { roleIds })
    }
    return qb.getMany()
  }

  findRoleRoutes(dto: RoleRouterDto) {
    return this.routerRepository.find({
      where: { id: In(dto.routerIds), roles: { id: dto.roleId } },
      relations: { roles: true },
    })
  }

  async removeRole(dto: RoleRouterDto) {
    const roleRouter = await this.findRoleRoutes(dto)
    if (!roleRouter)
      throw new BadRequestException('Role not found')

    const role = await this.roleService.findOne(dto.roleId)
    if (!role)
      throw new BadRequestException('未找到角色')

    if (role.code === RoleCode.SUPER_ADMIN)
      throw new BadRequestException('不能修改超级管理员的权限')

    roleRouter.forEach((router) => {
      router.roles = router.roles.filter(r => r.id !== dto.roleId)
    })
    return this.routerRepository.save(roleRouter)
  }

  async setRole(dto: RoleRouterDto) {
    const role = await this.roleService.findOne(dto.roleId)

    if (!role)
      throw new BadRequestException('未找到角色')

    if (role.code === RoleCode.SUPER_ADMIN)
      throw new BadRequestException('不能设置超级管理员的权限')

    const routers = await this.routerRepository.find({
      where: { id: In(dto.routerIds) },
      relations: { roles: true },
    })
    if (!routers)
      throw new BadRequestException('路由未找到')

    routers.forEach((router) => {
      if (!router.roles.some(r => r.id === role.id))
        router.roles.push(role)
    })

    return this.routerRepository.save(routers)
  }
}
