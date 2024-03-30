import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HostnameService } from './hostname.service'
import { HostnameController } from './hostname.controller'
import { Hostname } from './entities/hostname.entity'

@Module({
  controllers: [HostnameController],
  providers: [HostnameService],
  imports: [TypeOrmModule.forFeature([Hostname])],
})
export class HostnameModule {}
