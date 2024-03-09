import { Module } from '@nestjs/common'
import { RaceService } from './race.service'
import { RaceController } from './race.controller'
import { RaceCpModule } from './cp/cp.module'
import { RaceRecordModule } from './record/record.module'

@Module({
  controllers: [RaceController],
  providers: [RaceService],
  imports: [RaceCpModule, RaceRecordModule],
})
export class RaceModule {}
