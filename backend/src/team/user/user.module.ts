import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TeamUserService } from './user.service'
import { TeamUserController } from './user.controller'
import { TeamUser } from './entities/user.entity'

@Module({
  controllers: [TeamUserController],
  providers: [TeamUserService],
  imports: [TypeOrmModule.forFeature([TeamUser])],
})
export class TeamUserModule {}
