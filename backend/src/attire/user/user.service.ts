import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AttireUser } from './entities/user.entity'
import { CreateAttireUserDto } from './dto/create-user.dto'
import { GetAttireUserDto } from './dto/get-user.dto'
import { UpdateAttireUserDto } from './dto/update-user.dto'

@Injectable()
export class AttireUserService {
  constructor(
    @InjectRepository(AttireUser) private readonly attireUserRepository: Repository<AttireUser>,
  ) {}

  create(createAttireUserDto: CreateAttireUserDto) {
    return this.attireUserRepository.save(createAttireUserDto)
  }

  async findAll(payload: GetAttireUserDto) {
    const [list, total] = await this.attireUserRepository.findAndCount({
      skip: payload.skip,
      take: payload.take,
    })
    return { list, total }
  }

  findOne(id: string) {
    return this.attireUserRepository.findOne({ where: { id } })
  }

  async update(id: string, updateAttireUserDto: UpdateAttireUserDto) {
    const attireUser = await this.findOne(id)
    if (!attireUser)
      throw new Error('attireUser user not found')

    const merged = this.attireUserRepository.merge(
      attireUser,
      updateAttireUserDto,
    )

    return this.attireUserRepository.save(merged)
  }

  async remove(id: string) {
    const attireUser = await this.findOne(id)
    if (!attireUser)
      throw new Error('attireUser user not found')

    return this.attireUserRepository.remove(attireUser)
  }
}
