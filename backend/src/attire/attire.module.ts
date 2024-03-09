import { Module } from '@nestjs/common'
import { AttireService } from './attire.service'
import { AttireController } from './attire.controller'
import { UserAttireModule } from './user/user.module'

@Module({
  controllers: [AttireController],
  providers: [AttireService],
  imports: [UserAttireModule],
})
export class AttireModule {}
