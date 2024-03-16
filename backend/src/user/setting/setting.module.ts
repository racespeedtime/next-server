import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserSettingService } from './setting.service'
import { UserSettingController } from './setting.controller'
import { UserSetting } from './entities/setting.entity'

@Module({
  controllers: [UserSettingController],
  providers: [UserSettingService],
  imports: [TypeOrmModule.forFeature([UserSetting])],
})
export class UserSettingModule {}
