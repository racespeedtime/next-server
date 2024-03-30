import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { conditionWhere, getConditionOmits } from 'src/common/utils/condition-where.utils'
import { FindManyOptions, Repository } from 'typeorm'
import { Hostname } from './entities/hostname.entity'
import { CreateHostnameDto } from './dto/create-hostname.dto'
import { GetHostnameDto } from './dto/get-hostname.dto'
import { UpdateHostnameDto } from './dto/update-hostname.dto'

@Injectable()
export class HostnameService {
  constructor(
    @InjectRepository(Hostname) private readonly hostnameRepository: Repository<Hostname>,
  ) {}

  create(createHostnameDto: CreateHostnameDto) {
    return this.hostnameRepository.save(createHostnameDto)
  }

  async findAll(payload: GetHostnameDto) {
    const findOptions: FindManyOptions<Hostname> = {
      where: conditionWhere<GetHostnameDto>({
        payload,
        omits: getConditionOmits<GetHostnameDto>(),
      }),
      order: {
        createdAt: 'DESC',
      },
    }
    if (!payload.isAll) {
      findOptions.skip = payload.skip
      findOptions.take = payload.take
    }
    const [list, total] = await this.hostnameRepository.findAndCount(findOptions)
    return { list, total }
  }

  findOne(id: string) {
    return this.hostnameRepository.findOne({ where: { id } })
  }

  async update(id: string, updateHostnameDto: UpdateHostnameDto) {
    const hostname = await this.findOne(id)
    if (!hostname)
      throw new Error('hostname not found')

    const merged = this.hostnameRepository.merge(
      hostname,
      updateHostnameDto,
    )

    return this.hostnameRepository.save(merged)
  }

  async remove(id: string) {
    const hostname = await this.findOne(id)
    if (!hostname)
      throw new Error('hostname not found')

    return this.hostnameRepository.softRemove(hostname)
  }
}
