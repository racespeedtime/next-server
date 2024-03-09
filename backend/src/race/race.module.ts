import { Module } from '@nestjs/common'
import { RaceService } from './race.service'
import { RaceController } from './race.controller'
import { CpModule } from './cp/cp.module'
import { RecordModule } from './record/record.module'

@Module({
  controllers: [RaceController],
  providers: [RaceService],
  imports: [CpModule, RecordModule],
})
export class RaceModule {}
