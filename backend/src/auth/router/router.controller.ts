import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { Roles } from 'src/common/decorators/roles.decorator'
import { RoleCode } from 'src/common/enums/role.enum'
import { UserService } from 'src/user/user.service'
import { Request } from 'express'
import { User } from 'src/user/entities/user.entity'
import { FindRolesRoutesDto } from './dto/find-roles-routes.dto'
import { RoleRouterDto } from './dto/remove-role-router.dto'
import { UpdateRouterDto } from './dto/update-router.dto'
import { CreateRouterDto } from './dto/create-router.dto'
import { RouterService } from './router.service'

@ApiTags('auth/router')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('auth/router')
export class RouterController {
  constructor(
    private readonly routerService: RouterService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: '把某个角色的路由删除' })
  @Roles(RoleCode.SUPER_ADMIN)
  @Post('delRole')
  removeRole(@Body() dto: RoleRouterDto) {
    return this.routerService.removeRole(dto)
  }

  @ApiOperation({ summary: '设置路由给某个角色' })
  @Roles(RoleCode.SUPER_ADMIN)
  @Post('setRole')
  setRole(@Body() dto: RoleRouterDto) {
    return this.routerService.setRole(dto)
  }

  @ApiOperation({ summary: '根据角色查找所有的路由' })
  @Post('getRoles')
  async findRolesRoutes(@Body() dto: FindRolesRoutesDto, @Req() req: Request) {
    if (this.userService.isAdmin) {
      if (dto.roleIds?.length)
        return this.routerService.findRoutesByRoleIds(dto.roleIds)

      return this.routerService.findRoutesByRoleIds()
    }
    if (!(req.user as User).roles?.length)
      throw new BadRequestException('用户没有角色')

    return this.routerService.findRoutesByRoleIds(
      (req.user as User).roles.map(item => item.id),
    )
  }

  @ApiOperation({ summary: '创建一个路由' })
  @Roles(RoleCode.SUPER_ADMIN)
  @Post()
  create(@Body() createRouterDto: CreateRouterDto) {
    return this.routerService.create(createRouterDto)
  }

  @ApiOperation({ summary: '查看所有路由' })
  @Get()
  findAll() {
    return this.routerService.findAll()
  }

  @ApiOperation({ summary: '查看某个路由' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routerService.findOne(id)
  }

  @ApiOperation({ summary: '更新某个路由' })
  @Roles(RoleCode.SUPER_ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRouterDto: UpdateRouterDto) {
    return this.routerService.update(id, updateRouterDto)
  }

  @ApiOperation({ summary: '删除某个路由' })
  @Roles(RoleCode.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routerService.remove(id)
  }
}
