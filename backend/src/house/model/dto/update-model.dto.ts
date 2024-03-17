import { PartialType } from '@nestjs/swagger';
import { CreateHouseModelDto } from './create-model.dto';

export class UpdateHouseModelDto extends PartialType(CreateHouseModelDto) {}
