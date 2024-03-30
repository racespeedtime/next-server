import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VehicleService } from './vehicle.service'
import { VehicleController } from './vehicle.controller'
import { Vehicle } from './entities/vehicle.entity'

@Module({
  controllers: [VehicleController],
  providers: [VehicleService],
  imports: [TypeOrmModule.forFeature([Vehicle])],
  exports: [VehicleService],
})
export class VehicleModule {}
