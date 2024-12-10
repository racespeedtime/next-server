import { PlayerEvent } from '@infernus/core'

PlayerEvent.onCommandText(['r', 'race'], ({ next }) => {
  return next()
})
