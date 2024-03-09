import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { User } from './entities/user.entity'
import { UserSettingModule } from './setting/setting.module'
import { UserBanModule } from './ban/ban.module'
import { UserLoginRecordModule } from './login-record/login-record.module'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User]), UserSettingModule, UserBanModule, UserLoginRecordModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
