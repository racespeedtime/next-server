import { Module } from '@nestjs/common'
import { TeamService } from './team.service'
import { TeamController } from './team.controller'
import { UserModule } from './user/user.module'

@Module({
  controllers: [TeamController],
  providers: [TeamService],
  imports: [UserModule],
})
export class TeamModule {}
