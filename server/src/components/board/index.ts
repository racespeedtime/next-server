import { PlayerEvent } from '@infernus/core'

PlayerEvent.onCommandText(['b', 'board'], ({ next }) => {
  return next()
})
