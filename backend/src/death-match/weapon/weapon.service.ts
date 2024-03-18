import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
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
    const [list, total] = await this.deathMatchWeaponRepository.findAndCount({
      skip: payload.skip,
      take: payload.take,
    })
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
