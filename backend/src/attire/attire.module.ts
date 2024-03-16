import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AttireService } from './attire.service'
import { AttireController } from './attire.controller'
import { AttireUserModule } from './user/user.module'
import { Attire } from './entities/attire.entity'

@Module({
  controllers: [AttireController],
  providers: [AttireService],
  imports: [TypeOrmModule.forFeature([Attire]), AttireUserModule],
})
export class AttireModule {}
