import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RaceRecordService } from './record.service'
import { RaceRecordController } from './record.controller'
import { RaceRecord } from './entities/record.entity'

@Module({
  controllers: [RaceRecordController],
  providers: [RaceRecordService],
  imports: [TypeOrmModule.forFeature([RaceRecord])],
})
export class RaceRecordModule {}
