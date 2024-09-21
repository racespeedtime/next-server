import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BoardUserService } from './user.service'
import { BoardUserController } from './user.controller'
import { BoardUser } from './entities/user.entity'

@Module({
  controllers: [BoardUserController],
  providers: [BoardUserService],
  imports: [TypeOrmModule.forFeature([BoardUser])],
  exports: [BoardUserService],
})
export class BoardUserModule {}
