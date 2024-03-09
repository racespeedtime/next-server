import { Injectable } from '@nestjs/common'
import { CreateCpDto } from './dto/create-cp.dto'
import { UpdateCpDto } from './dto/update-cp.dto'

@Injectable()
export class CpService {
  create(createCpDto: CreateCpDto) {
    return 'This action adds a new cp'
  }

  findAll() {
    return `This action returns all cp`
  }

  findOne(id: number) {
    return `This action returns a #${id} cp`
  }

  update(id: number, updateCpDto: UpdateCpDto) {
    return `This action updates a #${id} cp`
  }

  remove(id: number) {
    return `This action removes a #${id} cp`
  }
}
