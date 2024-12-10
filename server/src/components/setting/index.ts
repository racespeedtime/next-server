import { PlayerEvent } from '@infernus/core'

PlayerEvent.onCommandText('wdch', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('motto', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('tail', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText(['sz', 'wdsz'], ({ next }) => {
  return next()
})

PlayerEvent.onCommandText(['weather', 'tianqi'], ({ next }) => {
  return next()
})

PlayerEvent.onCommandText(['time', 'shijian'], ({ next }) => {
  return next()
})
