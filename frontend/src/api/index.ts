import { createAllApi } from 'shared/api'
import instance from '@/utils/axios'

const { menuApi, userApi, roleApi } = createAllApi(instance)

export { menuApi, userApi, roleApi }
