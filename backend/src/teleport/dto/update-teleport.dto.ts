import { PartialType } from '@nestjs/swagger';
import { CreateTeleportDto } from './create-teleport.dto';

export class UpdateTeleportDto extends PartialType(CreateTeleportDto) {}
