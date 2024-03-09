import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { ScriptService } from './script.service'
import { CreateScriptDto } from './dto/create-script.dto'
import { UpdateScriptDto } from './dto/update-script.dto'

@ApiTags('race/cp/script')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('race/cp/script')

export class ScriptController {
  constructor(private readonly scriptService: ScriptService) {}

  @Post()
  create(@Body() createScriptDto: CreateScriptDto) {
    return this.scriptService.create(createScriptDto)
  }

  @Get()
  findAll() {
    return this.scriptService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scriptService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScriptDto: UpdateScriptDto) {
    return this.scriptService.update(+id, updateScriptDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scriptService.remove(+id)
  }
}
