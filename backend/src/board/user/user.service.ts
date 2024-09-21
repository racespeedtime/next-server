import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { conditionWhere, getConditionOmits } from 'src/common/utils/condition-where.utils'
import { UpdateBoardUserDto } from './dto/update-user.dto'
import { CreateBoardUserDto } from './dto/create-user.dto'
import { BoardUser } from './entities/user.entity'
import { GetBoardUserDto } from './dto/get-user.dto'

@Injectable()
export class BoardUserService {
  constructor(
    @InjectRepository(BoardUser) private readonly boardRepository: Repository<BoardUser>,
  ) {}

  create(createBoardDto: CreateBoardUserDto) {
    return this.boardRepository.save(createBoardDto)
  }

  async findAll(payload: GetBoardUserDto) {
    const findOptions: FindManyOptions<BoardUser> = {
      where: conditionWhere<GetBoardUserDto>({
        payload,
        mapping: { userId: 'user.id' },
        equals: ['userId'],
        omits: getConditionOmits<GetBoardUserDto>(),
      }),
      relations: {
        user: true,
      },
      order: {
        createdAt: 'DESC',
      },
    }
    if (!payload.isAll) {
      findOptions.skip = payload.skip
      findOptions.take = payload.take
    }
    const [list, total] = await this.boardRepository.findAndCount(findOptions)
    return { list, total }
  }

  findOne(id: string) {
    return this.boardRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    })
  }

  async update(id: string, updateBoardDto: UpdateBoardUserDto) {
    const board = await this.findOne(id)
    if (!board)
      throw new Error('board not found')

    const merged = this.boardRepository.merge(
      board,
      updateBoardDto,
    )

    return this.boardRepository.save(merged)
  }

  async remove(id: string) {
    const board = await this.findOne(id)
    if (!board)
      throw new Error('board not found')

    return this.boardRepository.remove(board)
  }
}
