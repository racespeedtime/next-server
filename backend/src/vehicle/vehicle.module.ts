import { Module } from '@nestjs/common'
import { VehicleService } from './vehicle.service'
import { VehicleController } from './vehicle.controller'
import { AttachmentsModule } from './attachments/attachments.module'

@Module({
  controllers: [VehicleController],
  providers: [VehicleService],
  imports: [AttachmentsModule],
})
export class VehicleModule {}
