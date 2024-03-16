import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TeamService } from './team.service'
import { TeamController } from './team.controller'
import { Team } from './entities/team.entity'

@Module({
  controllers: [TeamController],
  providers: [TeamService],
  imports: [TypeOrmModule.forFeature([Team])],
})
export class TeamModule {}
