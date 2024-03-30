import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { conditionWhere, getConditionOmits } from 'src/common/utils/condition-where.utils'
import { UserService } from 'src/user/user.service'
import { User } from 'src/user/entities/user.entity'
import { GetHouseDto } from './dto/get-house.dto'
import { House } from './entities/house.entity'
import { CreateHouseDto } from './dto/create-house.dto'
import { UpdateHouseDto } from './dto/update-house.dto'
import { BuySellHouseDto } from './dto/buy-sell-house.dto'
import { HouseModelService } from './model/model.service'

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House) private readonly houseRepository: Repository<House>,
    private readonly userService: UserService,
    private readonly houseModelService: HouseModelService,
  ) {}

  create(createHouseDto: CreateHouseDto) {
    return this.houseRepository.save(createHouseDto)
  }

  async findAll(payload: GetHouseDto) {
    const findOptions: FindManyOptions<House> = {
      where: {
        ...conditionWhere<GetHouseDto>({
          payload,
          mapping: { userId: 'user.id' },
          equals: ['userId', 'relation'],
          omits: getConditionOmits<GetHouseDto>(),
        }),
      },
      relations: {
        user: !payload.isAll,
      },
      order: {
        createdAt: 'DESC',
      },
    }
    if (!payload.isAll) {
      findOptions.skip = payload.skip
      findOptions.take = payload.take

      const [list, total] = await this.houseRepository.findAndCount(findOptions)

      const prices = await this.houseModelService.getSellPrice(list.map(item => item.id))

      const withPriceHouses = list.map((item, index) => {
        item.price = prices[index] || null
        return item
      })
      return { list: withPriceHouses, total }
    }

    const [list, total] = await this.houseRepository.findAndCount(findOptions)
    return { list, total }
  }

  async findOne(id: string) {
    const house = await this.houseRepository.findOne({
      where: { id },
      relations: {
        users: true,
      },
    })
    if (!house)
      throw new BadRequestException('房子不存在')

    const price = await this.houseModelService.getSellPrice(house.id)
    house.price = price || null
    return house
  }

  async update(id: string, updateHouseDto: UpdateHouseDto) {
    const house = await this.findOne(id)
    if (!house)
      throw new Error('house not found')

    const merged = this.houseRepository.merge(
      house,
      updateHouseDto,
    )

    return this.houseRepository.save(merged)
  }

  async remove(id: string) {
    const house = await this.findOne(id)
    if (!house)
      throw new Error('house not found')

    return this.houseRepository.softRemove(house)
  }

  async buy(buyHouseDto: BuySellHouseDto) {
    return this.houseRepository.manager.transaction(async (manager) => {
      const user = await this.userService.findOne(buyHouseDto.userId, { buyHouses: true })
      const house = await this.findOne(buyHouseDto.houseId)

      const hasHouse = user.buyHouses && user.buyHouses.some(house => house.id === buyHouseDto.houseId)
      if (hasHouse)
        throw new BadRequestException('您已拥有该房子')

      const price = await this.houseModelService.getSellPrice(house.id)

      if (user.cash < price)
        throw new BadRequestException(`您没有足够的余额来购买价值${price}的房子`)

      user.cash -= price
      user.buyHouses = user.buyHouses || []
      user.buyHouses.push(house)

      return await manager.save(User, user)
    })
  }

  async sell(sellHouseDto: BuySellHouseDto) {
    return this.houseRepository.manager.transaction(async (manager) => {
      const user = await this.userService.findOne(sellHouseDto.userId, { buyHouses: true })
      const house = await this.findOne(sellHouseDto.houseId)

      const houseIndex = user.buyHouses.findIndex(house => house.id === sellHouseDto.houseId)
      if (houseIndex === -1)
        throw new BadRequestException('您还没拥有该房子')

      const price = await this.houseModelService.getSellPrice(house.id)

      user.cash += price
      user.buyHouses.splice(houseIndex, 1)

      return await manager.save(User, user)
    })
  }
}
