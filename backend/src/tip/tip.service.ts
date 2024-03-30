import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { conditionWhere, getConditionOmits } from 'src/common/utils/condition-where.utils'
import { FindManyOptions, Repository } from 'typeorm'
import { UpdateTipDto } from './dto/update-tip.dto'
import { CreateTipDto } from './dto/create-tip.dto'
import { GetTipDto } from './dto/get-tip.dto'
import { Tip } from './entities/tip.entity'

@Injectable()
export class TipService {
  constructor(
    @InjectRepository(Tip) private readonly tipRepository: Repository<Tip>,
  ) {}

  create(createTipDto: CreateTipDto) {
    return this.tipRepository.save(createTipDto)
  }

  async findAll(payload: GetTipDto) {
    const findOptions: FindManyOptions<Tip> = {
      where: conditionWhere<GetTipDto>({
        payload,
        omits: getConditionOmits<GetTipDto>(),
      }),
      order: {
        createdAt: 'DESC',
      },
    }
    if (!payload.isAll) {
      findOptions.skip = payload.skip
      findOptions.take = payload.take
    }
    const [list, total] = await this.tipRepository.findAndCount(findOptions)
    return { list, total }
  }

  findOne(id: string) {
    return this.tipRepository.findOne({ where: { id } })
  }

  async update(id: string, updateTipDto: UpdateTipDto) {
    const tip = await this.findOne(id)
    if (!tip)
      throw new Error('tip not found')

    const merged = this.tipRepository.merge(
      tip,
      updateTipDto,
    )

    return this.tipRepository.save(merged)
  }

  async remove(id: string) {
    const tip = await this.findOne(id)
    if (!tip)
      throw new Error('tip not found')

    return this.tipRepository.softRemove(tip)
  }
}
