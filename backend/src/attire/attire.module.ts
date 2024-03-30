import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VehicleModule } from 'src/vehicle/vehicle.module'
import { VehicleAttachmentModule } from 'src/vehicle/attachment/attachment.module'
import { AttireService } from './attire.service'
import { AttireController } from './attire.controller'
import { AttireUserModule } from './user/user.module'
import { Attire } from './entities/attire.entity'

@Module({
  controllers: [AttireController],
  providers: [AttireService],
  imports: [TypeOrmModule.forFeature([Attire]), AttireUserModule, VehicleModule, VehicleAttachmentModule],
})
export class AttireModule {}
