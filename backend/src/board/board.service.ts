import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { conditionWhere, getConditionOmits } from 'src/common/utils/condition-where.utils'
import { UserService } from 'src/user/user.service'
import { CreateBoardDto } from './dto/create-board.dto'
import { UpdateBoardDto } from './dto/update-board.dto'
import { Board } from './entities/board.entity'
import { GetBoardDto } from './dto/get-board.dto'
import { BoardUserService } from './user/user.service'

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private readonly boardRepository: Repository<Board>,
    private readonly userService: UserService,
    private readonly boardUserService: BoardUserService,
  ) {}

  create(createBoardDto: CreateBoardDto) {
    return this.boardRepository.save(createBoardDto)
  }

  async findAll(payload: GetBoardDto) {
    const findOptions: FindManyOptions<Board> = {
      where: conditionWhere<GetBoardDto>({
        payload,
        omits: getConditionOmits<GetBoardDto>(),
      }),
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

  async findOne(id: string) {
    const board = await this.boardRepository.findOne({ where: { id } })
    if (!board)
      throw new Error('board not found')
    return board
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const board = await this.findOne(id)

    const merged = this.boardRepository.merge(
      board,
      updateBoardDto,
    )

    return this.boardRepository.save(merged)
  }

  async remove(id: string) {
    const board = await this.findOne(id)

    return this.boardRepository.softRemove(board)
  }
}
