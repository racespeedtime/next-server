import type { CustomAxiosRequest } from '../../types'
import { getRestfulApi } from '../../utils'

export function createRaceApi(request: CustomAxiosRequest) {
  return {
    ...getRestfulApi(request, 'race'),
  }
}
