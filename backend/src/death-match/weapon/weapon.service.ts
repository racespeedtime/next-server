import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { conditionWhere, getConditionOmits } from 'src/common/utils/condition-where.utils'
import { CreateDeathMatchWeaponDto } from './dto/create-weapon.dto'
import { UpdateDeathMatchWeaponDto } from './dto/update-weapon.dto'
import { GetDeathMatchWeaponDto } from './dto/get-weapon.dto'
import { DeathMatchWeapon } from './entities/weapon.entity'

@Injectable()
export class DeathMatchWeaponService {
  constructor(
    @InjectRepository(DeathMatchWeapon) private readonly deathMatchWeaponRepository: Repository<DeathMatchWeapon>,
  ) {}

  create(createDeathMatchWeaponDto: CreateDeathMatchWeaponDto) {
    return this.deathMatchWeaponRepository.save(createDeathMatchWeaponDto)
  }

  async findAll(payload: GetDeathMatchWeaponDto) {
    const findOptions: FindManyOptions<DeathMatchWeapon> = {
      where: conditionWhere<GetDeathMatchWeaponDto>({
        payload,
        equals: ['deathMatchId'],
        mapping: { deathMatchId: 'deathMatch.id' },
        omits: getConditionOmits<GetDeathMatchWeaponDto>(),
      }),
      order: {
        updatedAt: 'DESC',
      },
    }
    if (!payload.isAll) {
      findOptions.skip = payload.skip
      findOptions.take = payload.take
    }
    const [list, total] = await this.deathMatchWeaponRepository.findAndCount(findOptions)
    return { list, total }
  }

  findOne(id: string) {
    return this.deathMatchWeaponRepository.findOne({ where: { id } })
  }

  async update(id: string, updateDeathMatchWeaponDto: UpdateDeathMatchWeaponDto) {
    const deathMatchWeapon = await this.findOne(id)
    if (!deathMatchWeapon)
      throw new Error('deathMatchWeapon not found')

    const merged = this.deathMatchWeaponRepository.merge(
      deathMatchWeapon,
      updateDeathMatchWeaponDto,
    )

    return this.deathMatchWeaponRepository.save(merged)
  }

  async remove(id: string) {
    const deathMatchWeapon = await this.findOne(id)
    if (!deathMatchWeapon)
      throw new Error('deathMatchWeapon not found')

    return this.deathMatchWeaponRepository.remove(deathMatchWeapon)
  }
}
