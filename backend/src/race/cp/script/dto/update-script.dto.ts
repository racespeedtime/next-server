import { PartialType } from '@nestjs/swagger'
import { CreateRaceCpScriptDto } from './create-script.dto'

export class UpdateRaceCpScriptDto extends PartialType(CreateRaceCpScriptDto) {}
