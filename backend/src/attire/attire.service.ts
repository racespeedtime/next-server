import { Injectable } from '@nestjs/common'
import { CreateAttireDto } from './dto/create-attire.dto'
import { UpdateAttireDto } from './dto/update-attire.dto'

@Injectable()
export class AttireService {
  create(createAttireDto: CreateAttireDto) {
    return 'This action adds a new attire'
  }

  findAll() {
    return `This action returns all attire`
  }

  findOne(id: number) {
    return `This action returns a #${id} attire`
  }

  update(id: number, updateAttireDto: UpdateAttireDto) {
    return `This action updates a #${id} attire`
  }

  remove(id: number) {
    return `This action removes a #${id} attire`
  }
}
