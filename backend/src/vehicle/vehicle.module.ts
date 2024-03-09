import { Module } from '@nestjs/common'
import { VehicleService } from './vehicle.service'
import { VehicleController } from './vehicle.controller'
import { VehicleAttachmentsModule } from './attachments/attachments.module'

@Module({
  controllers: [VehicleController],
  providers: [VehicleService],
  imports: [VehicleAttachmentsModule],
})
export class VehicleModule {}
