import { PartialType } from '@nestjs/swagger';
import { CreateDeathMatchWeaponDto } from './create-weapon.dto';

export class UpdateDeathMatchWeaponDto extends PartialType(CreateDeathMatchWeaponDto) {}
