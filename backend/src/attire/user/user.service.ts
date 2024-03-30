import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm'
import { conditionWhere, getConditionOmits } from 'src/common/utils/condition-where.utils'
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
    const findOptions: FindManyOptions<AttireUser> = {
      where: conditionWhere<GetAttireUserDto>({
        payload,
        mapping: { userId: 'user.id' },
        equals: ['userId'],
        omits: getConditionOmits<GetAttireUserDto>(),
      }),
      relations: {
        attire: true,
        user: !payload.userId,
      },
      order: {
        createdAt: 'DESC',
      },
    }

    if (!payload.isAll) {
      findOptions.skip = payload.skip
      findOptions.take = payload.take
    }
    const [list, total] = await this.attireUserRepository.findAndCount(findOptions)
    return { list, total }
  }

  async findOne(id: string, payload = new GetAttireUserDto()) {
    const findOptions: FindOneOptions<AttireUser> = {
      where: {
        id,
        ...conditionWhere({
          payload,
          mapping: { userId: 'user.id' },
          equals: ['userId'],
        }),
      },
      relations: {
        attire: true,
        user: true,
      },
      order: {
        createdAt: 'DESC',
      },
    }
    const attireUser = await this.attireUserRepository.findOne(findOptions)
    if (!attireUser)
      throw new Error('attireUser user not found')
    return attireUser
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
    return this.attireUserRepository.remove(attireUser)
  }

  countSameAttires(attireId: string) {
    return this.attireUserRepository.count({
      where: {
        attire: {
          id: attireId,
        },
      },
    })
  }
}
