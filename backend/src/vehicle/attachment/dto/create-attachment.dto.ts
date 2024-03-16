import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateVehicleAttachmentDto {
  @IsNumber()
  @ApiProperty()
  modelId: number

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  slotId: number

  @IsNumber()
  @ApiProperty()
  x: number

  @IsNumber()
  @ApiProperty()
  y: number

  @IsNumber()
  @ApiProperty()
  z: number

  @IsNumber()
  @ApiProperty()
  rX: number

  @IsNumber()
  @ApiProperty()
  rY: number

  @IsNumber()
  @ApiProperty()
  rZ: number

  @IsString()
  @ApiProperty()
  vehicleId: string
}
