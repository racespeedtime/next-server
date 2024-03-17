import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DeathMatchSpawnService } from './spawn.service'
import { DeathMatchSpawnController } from './spawn.controller'
import { DeathMatchSpawn } from './entities/spawn.entity'

@Module({
  controllers: [DeathMatchSpawnController],
  providers: [DeathMatchSpawnService],
  imports: [TypeOrmModule.forFeature([DeathMatchSpawn])],
})
export class DeathMatchSpawnModule {}
