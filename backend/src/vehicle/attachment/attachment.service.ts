import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateVehicleAttachmentDto } from './dto/create-attachment.dto'
import { UpdateVehicleAttachmentDto } from './dto/update-attachment.dto'
import { GetVehicleAttachmentDto } from './dto/get-attchment.dto'
import { VehicleAttachment } from './entities/attachment.entity'

@Injectable()
export class VehicleAttachmentService {
  constructor(
    @InjectRepository(VehicleAttachment) private readonly vehicleAttachmentRepository: Repository<VehicleAttachment>,
  ) {}

  create(createVehicleAttachmentDto: CreateVehicleAttachmentDto) {
    return this.vehicleAttachmentRepository.save(createVehicleAttachmentDto)
  }

  async findAll(payload: GetVehicleAttachmentDto) {
    const [list, total] = await this.vehicleAttachmentRepository.findAndCount({
      skip: payload.skip,
      take: payload.take,
    })
    return { list, total }
  }

  findOne(id: string) {
    return this.vehicleAttachmentRepository.findOne({ where: { id } })
  }

  async update(id: string, updateVehicleAttachmentDto: UpdateVehicleAttachmentDto) {
    const vehicleAttachment = await this.findOne(id)
    if (!vehicleAttachment)
      throw new Error('vehicleAttachment not found')

    const merged = this.vehicleAttachmentRepository.merge(
      vehicleAttachment,
      updateVehicleAttachmentDto,
    )

    return this.vehicleAttachmentRepository.save(merged)
  }

  async remove(id: string) {
    const vehicleAttachment = await this.findOne(id)
    if (!vehicleAttachment)
      throw new Error('vehicleAttachment not found')

    return this.vehicleAttachmentRepository.remove(vehicleAttachment)
  }
}
