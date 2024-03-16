import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RaceCpService } from './cp.service'
import { RaceCpController } from './cp.controller'
import { RaceCp } from './entities/cp.entity'

@Module({
  controllers: [RaceCpController],
  providers: [RaceCpService],
  imports: [TypeOrmModule.forFeature([RaceCp])],
})
export class RaceCpModule {}
