import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PaginateDto } from 'src/common/dtos/paginate.dto'

export class GetVehicleAttachmentDto extends PaginateDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  vehicleId?: string
}
