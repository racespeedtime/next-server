import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VehicleAttachmentService } from './attachment.service'
import { VehicleAttachmentController } from './attachment.controller'
import { VehicleAttachment } from './entities/attachment.entity'

@Module({
  controllers: [VehicleAttachmentController],
  providers: [VehicleAttachmentService],
  imports: [TypeOrmModule.forFeature([VehicleAttachment])],
})
export class VehicleAttachmentModule {}
