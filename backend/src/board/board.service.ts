import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { conditionWhere, getConditionOmits } from 'src/common/utils/condition-where.utils'
import { UpdateBoardDto } from './dto/update-board.dto'
import { CreateBoardDto } from './dto/create-board.dto'
import { Board } from './entities/board.entity'
import { GetBoardDto } from './dto/get-board.dto'

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private readonly boardRepository: Repository<Board>,
  ) {}

  create(createBoardDto: CreateBoardDto) {
    return this.boardRepository.save(createBoardDto)
  }

  async findAll(payload: GetBoardDto) {
    const findOptions: FindManyOptions<Board> = {
      where: conditionWhere<GetBoardDto>({
        payload,
        mapping: { userId: 'user.id' },
        equals: ['userId'],
        omits: getConditionOmits<GetBoardDto>(),
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

  async update(id: string, updateBoardDto: UpdateBoardDto) {
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
