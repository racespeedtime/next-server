import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { RoleCode } from 'src/common/enums/role.enum'
import { Roles } from 'src/common/decorators/roles.decorator'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { SetUserRolesDto } from './dto/set-user-roles.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { CreateRoleDto } from './dto/create-role.dto'
import { RoleService } from './role.service'
import { GetRolesDto } from './dto/get-roles.dto'

@ApiBearerAuth()
@ApiTags('role')
@UseGuards(JwtGuard)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: '创建角色' })
  @UseGuards(RolesGuard)
  @Roles(RoleCode.SUPER_ADMIN)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto)
  }

  @ApiOperation({ summary: '查找所有角色' })
  @Get()
  findAll(@Query(new PaginatePipe()) params: GetRolesDto) {
    return this.roleService.findAll(params)
  }

  @ApiOperation({ summary: '设置用户角色' })
  @UseGuards(RolesGuard)
  @Roles(RoleCode.SUPER_ADMIN)
  @Post('/setUserRoles')
  setUserRoles(@Body() userRoles: SetUserRolesDto) {
    return this.roleService.setUserRoles(userRoles)
  }

  @ApiOperation({ summary: '批量删除角色' })
  @UseGuards(RolesGuard)
  @Roles(RoleCode.SUPER_ADMIN)
  @Post('/batchRemove')
  batchRemove(@Body('roleIds') ids: string[]) {
    return this.roleService.batchRemove(ids)
  }

  @Get(':id')
  @ApiOperation({ summary: '查找角色' })
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id)
  }

  @ApiOperation({ summary: '更新角色' })
  @UseGuards(RolesGuard)
  @Roles(RoleCode.SUPER_ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto)
  }

  @ApiOperation({ summary: '删除角色' })
  @UseGuards(RolesGuard)
  @Roles(RoleCode.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id)
  }
}
