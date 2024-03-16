import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RaceService } from './race.service'
import { RaceController } from './race.controller'
import { Race } from './entities/race.entity'

@Module({
  controllers: [RaceController],
  providers: [RaceService],
  imports: [TypeOrmModule.forFeature([Race])],
})
export class RaceModule {}
