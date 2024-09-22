import type { CustomAxiosRequest } from 'shared/types'
import { getRestfulApi } from 'shared/utils'

export function createAttireApi(request: CustomAxiosRequest) {
  return {
    ...getRestfulApi(request, 'attire'),
  }
}
