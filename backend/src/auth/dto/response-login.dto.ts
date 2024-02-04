import { Expose } from 'class-transformer'
import { User } from 'src/user/entities/user.entity'

export class ResponseLoginDto {
  @Expose()
  token: string

  @Expose()
  user: User
}
