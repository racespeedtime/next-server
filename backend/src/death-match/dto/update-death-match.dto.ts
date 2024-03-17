import { PartialType } from '@nestjs/swagger';
import { CreateDeathMatchDto } from './create-death-match.dto';

export class UpdateDeathMatchDto extends PartialType(CreateDeathMatchDto) {}
