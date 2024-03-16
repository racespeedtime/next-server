import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
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
    const [list, total] = await this.boardRepository.findAndCount({
      skip: payload.skip,
      take: payload.take,
    })
    return { list, total }
  }

  findOne(id: string) {
    return this.boardRepository.findOne({ where: { id } })
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
