import { Module } from '@nestjs/common'
import { CpService } from './cp.service'
import { CpController } from './cp.controller'
import { RaceCpScriptModule } from './script/script.module'

@Module({
  controllers: [CpController],
  providers: [CpService],
  imports: [RaceCpScriptModule],
})
export class RaceCpModule {}
