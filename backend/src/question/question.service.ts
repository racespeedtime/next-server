import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { conditionWhere, getConditionOmits } from 'src/common/utils/condition-where.utils'
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
    const findOptions: FindManyOptions<Question> = {
      where: conditionWhere<GetQuestionDto>({
        payload,
        omits: getConditionOmits<GetQuestionDto>(),
      }),
      order: {
        updatedAt: 'DESC',
      },
    }
    if (!payload.isAll) {
      findOptions.skip = payload.skip
      findOptions.take = payload.take
    }
    const [list, total] = await this.questionRepository.findAndCount(findOptions)
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

    return this.questionRepository.softRemove(question)
  }
}
