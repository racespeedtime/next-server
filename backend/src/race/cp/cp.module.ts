import { Module } from '@nestjs/common'
import { CpService } from './cp.service'
import { CpController } from './cp.controller'
import { ScriptModule } from './script/script.module'

@Module({
  controllers: [CpController],
  providers: [CpService],
  imports: [ScriptModule],
})
export class CpModule {}
