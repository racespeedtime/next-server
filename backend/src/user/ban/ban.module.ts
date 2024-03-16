import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserBanService } from './ban.service'
import { UserBanController } from './ban.controller'
import { UserBan } from './entities/ban.entity'

@Module({
  controllers: [UserBanController],
  providers: [UserBanService],
  imports: [TypeOrmModule.forFeature([UserBan])],
})
export class UserBanModule {}
