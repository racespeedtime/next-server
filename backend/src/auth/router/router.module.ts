import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleModule } from 'src/role/role.module'
import { RouterService } from './router.service'
import { RouterController } from './router.controller'
import { Router } from './entities/router.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Router]), RoleModule],
  controllers: [RouterController],
  providers: [RouterService],
})
export class RouterModule {}
