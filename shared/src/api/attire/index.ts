import type { CustomAxiosRequest } from '../../types'
import { getRestfulApi } from '../../utils'

export function createAttireApi(request: CustomAxiosRequest) {
  return {
    ...getRestfulApi(request, 'attire'),
  }
}
