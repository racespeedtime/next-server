import { UseInterceptors } from '@nestjs/common'
import { ClassConstructor } from 'class-transformer'
import { SerializeInterceptor } from 'src/common/interceptors/serialize.interceptor'

export function Serialize(dto: ClassConstructor<unknown>) {
  return UseInterceptors(new SerializeInterceptor(dto))
}
