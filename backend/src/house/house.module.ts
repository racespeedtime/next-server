import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HouseService } from './house.service'
import { HouseController } from './house.controller'
import { House } from './entities/house.entity'
import { HouseModelModule } from './model/model.module'

@Module({
  controllers: [HouseController],
  providers: [HouseService],
  imports: [TypeOrmModule.forFeature([House]), HouseModelModule],
})
export class HouseModule {}
