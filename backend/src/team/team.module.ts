import { Module } from '@nestjs/common'
import { TeamService } from './team.service'
import { TeamController } from './team.controller'
import { TeamUserModule } from './user/user.module'

@Module({
  controllers: [TeamController],
  providers: [TeamService],
  imports: [TeamUserModule],
})
export class TeamModule {}
