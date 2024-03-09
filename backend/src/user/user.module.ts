import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { User } from './entities/user.entity'
import { SettingModule } from './setting/setting.module'
import { BanModule } from './ban/ban.module'
import { LoginRecordModule } from './login-record/login-record.module'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User]), SettingModule, BanModule, LoginRecordModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
