import { Injectable } from '@nestjs/common'
import { CreateHouseModelDto } from './dto/create-model.dto'
import { UpdateHouseModelDto } from './dto/update-model.dto'

@Injectable()
export class HouseModelService {
  create(createHouseModelDto: CreateHouseModelDto) {
    return 'This action adds a new houseModel'
  }

  findAll() {
    return `This action returns all houseModel`
  }

  findOne(id: number) {
    return `This action returns a #${id} houseModel`
  }

  update(id: number, updateHouseModelDto: UpdateHouseModelDto) {
    return `This action updates a #${id} houseModel`
  }

  remove(id: number) {
    return `This action removes a #${id} houseModel`
  }
}
