import type { CustomAxiosRequest } from 'shared/types'
import { getRestfulApi } from 'shared/utils'

export function createHouseApi(request: CustomAxiosRequest) {
  return {
    ...getRestfulApi(request, 'house'),
  }
}
