import { PlayerEvent } from '@infernus/core'

PlayerEvent.onCommandText('pm', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText(['count', 'daojishi', 'djs'], ({ next }) => {
  return next()
})
