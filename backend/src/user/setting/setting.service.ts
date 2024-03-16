import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
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
    const [list, total] = await this.userSettingRepository.findAndCount({
      skip: payload.skip,
      take: payload.take,
    })
    return { list, total }
  }

  findOne(id: string) {
    return this.userSettingRepository.findOne({ where: { id } })
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
