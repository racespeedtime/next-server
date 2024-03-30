import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TipService } from './tip.service'
import { TipController } from './tip.controller'
import { Tip } from './entities/tip.entity'

@Module({
  controllers: [TipController],
  providers: [TipService],
  imports: [TypeOrmModule.forFeature([Tip])],
})
export class TipModule {}
