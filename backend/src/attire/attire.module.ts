import { Module } from '@nestjs/common'
import { AttireService } from './attire.service'
import { AttireController } from './attire.controller'
import { UserModule } from './user/user.module'

@Module({
  controllers: [AttireController],
  providers: [AttireService],
  imports: [UserModule],
})
export class AttireModule {}
