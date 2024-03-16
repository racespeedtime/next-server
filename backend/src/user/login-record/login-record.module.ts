import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserLoginRecordService } from './login-record.service'
import { UserLoginRecordController } from './login-record.controller'
import { UserLoginRecord } from './entities/login-record.entity'

@Module({
  controllers: [UserLoginRecordController],
  providers: [UserLoginRecordService],
  imports: [TypeOrmModule.forFeature([UserLoginRecord])],
})
export class UserLoginRecordModule {}
