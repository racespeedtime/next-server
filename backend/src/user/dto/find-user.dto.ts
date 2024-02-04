import { User } from '../entities/user.entity'

export class FindUserDto {
  list: User[]
  total: number
}
