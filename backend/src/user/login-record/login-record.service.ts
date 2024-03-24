import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { conditionWhere, getDateRangeOperator } from 'src/common/utils/condition-where.utils'
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
    const findOptions: FindManyOptions<UserLoginRecord> = {
      where: {
        ...conditionWhere<GetUserLoginRecordDto>({
          payload,
          equals: ['userId'],
          mapping: { userId: 'user.id' },
        }),
        createdAt: getDateRangeOperator({ payload }),
      },
      relations: {
        user: !payload.userId && !payload.isAll,
      },
      order: {
        createdAt: 'DESC',
      },
    }
    if (!payload.isAll) {
      findOptions.skip = payload.skip
      findOptions.take = payload.take
    }
    const [list, total] = await this.userLoginRecordRepository.findAndCount(findOptions)
    return { list, total }
  }

  findOne(id: string) {
    return this.userLoginRecordRepository.findOne({
      where: { id },
      relations: { user: true },
    })
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
