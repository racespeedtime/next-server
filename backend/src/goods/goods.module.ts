import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GoodsService } from './goods.service'
import { GoodsController } from './goods.controller'
import { Goods } from './entities/goods.entity'

@Module({
  controllers: [GoodsController],
  providers: [GoodsService],
  imports: [TypeOrmModule.forFeature([Goods])],
})
export class GoodsModule {}
