import type { CustomAxiosRequest } from '../../types'
import { getRestfulApi } from '../../utils'

export function createHouseApi(request: CustomAxiosRequest) {
  return {
    ...getRestfulApi(request, 'house'),
  }
}
