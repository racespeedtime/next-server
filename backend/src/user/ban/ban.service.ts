import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserBanDto } from './dto/create-ban.dto'
import { UpdateUserBanDto } from './dto/update-ban.dto'
import { UserBan } from './entities/ban.entity'
import { GetUserBanDto } from './dto/get-ban.dto'

@Injectable()
export class UserBanService {
  constructor(
    @InjectRepository(UserBan) private readonly userBanRepository: Repository<UserBan>,
  ) {}

  create(createUserBanDto: CreateUserBanDto) {
    return this.userBanRepository.save(createUserBanDto)
  }

  async findAll(payload: GetUserBanDto) {
    const [list, total] = await this.userBanRepository.findAndCount({
      skip: payload.skip,
      take: payload.take,
    })
    return { list, total }
  }

  findOne(id: string) {
    return this.userBanRepository.findOne({ where: { id } })
  }

  async update(id: string, updateUserBanDto: UpdateUserBanDto) {
    const userBan = await this.findOne(id)
    if (!userBan)
      throw new Error('userBan not found')

    const merged = this.userBanRepository.merge(
      userBan,
      updateUserBanDto,
    )

    return this.userBanRepository.save(merged)
  }

  async remove(id: string) {
    const userBan = await this.findOne(id)
    if (!userBan)
      throw new Error('userBan not found')

    return this.userBanRepository.remove(userBan)
  }
}
