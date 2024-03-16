import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TeleportService } from './teleport.service'
import { TeleportController } from './teleport.controller'
import { Teleport } from './entities/teleport.entity'

@Module({
  controllers: [TeleportController],
  providers: [TeleportService],
  imports: [TypeOrmModule.forFeature([Teleport])],
})
export class TeleportModule {}
