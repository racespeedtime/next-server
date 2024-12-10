import { PlayerEvent } from '@infernus/core'

PlayerEvent.onCommandText('house', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('open', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('move', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('houseEdit', ({ next }) => {
  return next()
})
