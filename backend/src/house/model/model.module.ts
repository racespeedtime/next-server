import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HouseModelService } from './model.service'
import { HouseModelController } from './model.controller'
import { HouseModel } from './entities/model.entity'

@Module({
  controllers: [HouseModelController],
  providers: [HouseModelService],
  imports: [TypeOrmModule.forFeature([HouseModel])],
})
export class HouseModelModule {}
