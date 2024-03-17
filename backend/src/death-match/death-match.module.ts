import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DeathMatchService } from './death-match.service'
import { DeathMatchController } from './death-match.controller'
import { DeathMatch } from './entities/death-match.entity'
import { DeathMatchSpawnModule } from './spawn/spawn.module';

@Module({
  controllers: [DeathMatchController],
  providers: [DeathMatchService],
  imports: [TypeOrmModule.forFeature([DeathMatch]), DeathMatchSpawnModule],
})
export class DeathMatchModule {}
