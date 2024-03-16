import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RaceCpScriptService } from './script.service'
import { RaceCpScriptController } from './script.controller'
import { RaceCpScript } from './entities/script.entity'

@Module({
  controllers: [RaceCpScriptController],
  providers: [RaceCpScriptService],
  imports: [TypeOrmModule.forFeature([RaceCpScript])],
})
export class RaceCpScriptModule {}
