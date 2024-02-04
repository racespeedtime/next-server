import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { RoleCode } from 'src/common/enums/role.enum'
import { Roles } from 'src/common/decorators/roles.decorator'
import { Request } from 'express'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { PaginatePipe } from 'src/common/pipes/paginate.pipe'
import { Serialize } from 'src/common/decorators/serialize.decorator'
import { GetUserDto } from './dto/get-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'
import { FindUserDto } from './dto/find-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@ApiBearerAuth()
@ApiTags('user')
@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '查找所有用户' })
  @Serialize(FindUserDto)
  @Get()
  findAll(@Query(new PaginatePipe()) params: GetUserDto) {
    return this.userService.findAll(params)
  }

  @ApiOperation({ summary: '查找用户' })
  @Serialize(User)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @ApiOperation({ summary: '更新用户' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    if (!this.userService.isSelfOrAdmin(id, req.user as User))
      throw new BadRequestException('不可修改他人的信息')

    return this.userService.update(id, updateUserDto)
  }

  @ApiOperation({ summary: '创建角色' })
  @UseGuards(RolesGuard)
  @Roles(RoleCode.SUPER_ADMIN)
  @Post()
  create(@Body() createRoleDto: CreateUserDto) {
    return this.userService.create(createRoleDto)
  }

  @ApiOperation({ summary: '删除用户' })
  @UseGuards(RolesGuard)
  @Roles(RoleCode.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id)
  }

  @ApiOperation({ summary: '批量删除用户' })
  @UseGuards(RolesGuard)
  @Roles(RoleCode.SUPER_ADMIN)
  @Post('/batchRemove')
  batchRemove(@Body('userIds') ids: string[]) {
    return this.userService.batchRemove(ids)
  }
}
