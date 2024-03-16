import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserLoginRecord } from './entities/login-record.entity'
import { CreateUserLoginRecordDto } from './dto/create-login-record.dto'
import { GetUserLoginRecordDto } from './dto/get-login-record.dto'
import { UpdateUserLoginRecordDto } from './dto/update-login-record.dto'

@Injectable()
export class UserLoginRecordService {
  constructor(
    @InjectRepository(UserLoginRecord) private readonly userLoginRecordRepository: Repository<UserLoginRecord>,
  ) {}

  create(createUserLoginRecordDto: CreateUserLoginRecordDto) {
    return this.userLoginRecordRepository.save(createUserLoginRecordDto)
  }

  async findAll(payload: GetUserLoginRecordDto) {
    const [list, total] = await this.userLoginRecordRepository.findAndCount({
      skip: payload.skip,
      take: payload.take,
    })
    return { list, total }
  }

  findOne(id: string) {
    return this.userLoginRecordRepository.findOne({ where: { id } })
  }

  async update(id: string, updateUserLoginRecordDto: UpdateUserLoginRecordDto) {
    const userLoginRecord = await this.findOne(id)
    if (!userLoginRecord)
      throw new Error('userLoginRecord not found')

    const merged = this.userLoginRecordRepository.merge(
      userLoginRecord,
      updateUserLoginRecordDto,
    )

    return this.userLoginRecordRepository.save(merged)
  }

  async remove(id: string) {
    const userLoginRecord = await this.findOne(id)
    if (!userLoginRecord)
      throw new Error('userLoginRecord not found')

    return this.userLoginRecordRepository.remove(userLoginRecord)
  }
}
