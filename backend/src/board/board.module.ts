import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BoardService } from './board.service'
import { BoardController } from './board.controller'
import { Board } from './entities/board.entity'
import { BoardUserModule } from './user/user.module'

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  imports: [TypeOrmModule.forFeature([Board]), BoardUserModule],
})
export class BoardModule {}
