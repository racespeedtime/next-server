import { PlayerEvent } from '@infernus/core'

PlayerEvent.onCommandText('createGoods', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('delGoods', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('goGoods', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('resetGoods', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText(['myGoods', 'wdjj'], ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('resetOwner', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('goodsHelp', ({ next }) => {
  return next()
})
