import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AttireUserService } from './user.service'
import { AttireUserController } from './user.controller'
import { AttireUser } from './entities/user.entity'

@Module({
  controllers: [AttireUserController],
  providers: [AttireUserService],
  imports: [TypeOrmModule.forFeature([AttireUser])],
  exports: [AttireUserService],
})
export class AttireUserModule {}
