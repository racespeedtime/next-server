import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { conditionWhere, getDateRangeOperator } from 'src/common/utils/condition-where.utils'
import { CreateUserSettingDto } from './dto/create-setting.dto'
import { UpdateUserSettingDto } from './dto/update-setting.dto'
import { GetUserSettingDto } from './dto/get-setting.dto'
import { UserSetting } from './entities/setting.entity'

@Injectable()
export class UserSettingService {
  constructor(
    @InjectRepository(UserSetting) private readonly userSettingRepository: Repository<UserSetting>,
  ) {}

  create(createUserSettingDto: CreateUserSettingDto) {
    return this.userSettingRepository.save(createUserSettingDto)
  }

  async findAll(payload: GetUserSettingDto) {
    const findOptions: FindManyOptions<UserSetting> = {
      where: {
        ...conditionWhere<GetUserSettingDto>({
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
    const [list, total] = await this.userSettingRepository.findAndCount(findOptions)
    return { list, total }
  }

  findOne(id: string) {
    return this.userSettingRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    })
  }

  async update(id: string, updateUserSettingDto: UpdateUserSettingDto) {
    const userSetting = await this.findOne(id)
    if (!userSetting)
      throw new Error('userSetting not found')

    const merged = this.userSettingRepository.merge(
      userSetting,
      updateUserSettingDto,
    )

    return this.userSettingRepository.save(merged)
  }

  async remove(id: string) {
    const userSetting = await this.findOne(id)
    if (!userSetting)
      throw new Error('userSetting not found')

    return this.userSettingRepository.remove(userSetting)
  }
}
