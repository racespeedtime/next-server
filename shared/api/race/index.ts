import type { CustomAxiosRequest } from 'shared/types'
import { getRestfulApi } from 'shared/utils'

export function createRaceApi(request: CustomAxiosRequest) {
  return {
    ...getRestfulApi(request, 'race'),
  }
}
