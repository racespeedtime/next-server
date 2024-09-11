import { GameMode } from '@infernus/core'
import { logger } from './logger'

GameMode.onInit(({ next }) => {
  logger.info('游戏模式初始化完毕')
  return next()
})
