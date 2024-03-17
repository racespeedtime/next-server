import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HouseService } from './house.service'
import { HouseController } from './house.controller'
import { House } from './entities/house.entity'

@Module({
  controllers: [HouseController],
  providers: [HouseService],
  imports: [TypeOrmModule.forFeature([House])],
})
export class HouseModule {}
