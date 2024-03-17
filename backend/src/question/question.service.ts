import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateQuestionDto } from './dto/create-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'
import { GetQuestionDto } from './dto/get-question.dto'
import { Question } from './entities/question.entity'

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question) private readonly questionRepository: Repository<Question>,
  ) {}

  create(createQuestionDto: CreateQuestionDto) {
    return this.questionRepository.save(createQuestionDto)
  }

  async findAll(payload: GetQuestionDto) {
    const [list, total] = await this.questionRepository.findAndCount({
      skip: payload.skip,
      take: payload.take,
    })
    return { list, total }
  }

  findOne(id: string) {
    return this.questionRepository.findOne({ where: { id } })
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.findOne(id)
    if (!question)
      throw new Error('question not found')

    const merged = this.questionRepository.merge(
      question,
      updateQuestionDto,
    )

    return this.questionRepository.save(merged)
  }

  async remove(id: string) {
    const question = await this.findOne(id)
    if (!question)
      throw new Error('question not found')

    return this.questionRepository.remove(question)
  }
}
