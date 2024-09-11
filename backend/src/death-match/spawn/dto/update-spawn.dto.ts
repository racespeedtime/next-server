import { PartialType } from '@nestjs/swagger'
import { CreateDeathMatchSpawnDto } from './create-spawn.dto'

export class UpdateDeathMatchSpawnDto extends PartialType(CreateDeathMatchSpawnDto) {}
