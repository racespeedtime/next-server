import { PartialType } from '@nestjs/swagger'
import { CreateBoardUserDto } from './create-user.dto'

export class UpdateBoardUserDto extends PartialType(CreateBoardUserDto) {}
