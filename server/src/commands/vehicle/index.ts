import { Dialog, DialogStylesEnum, Player, PlayerEvent, Vehicle } from '@infernus/core'
import { ColorEnum } from '@/enums/color'
import { vehicleNames } from '@/constants'

const g_playerVeh = new Map<Player, Vehicle>()

PlayerEvent.onDisconnect(({ player, next }) => {
  const p_veh = g_playerVeh.get(player)
  if (p_veh) {
    p_veh.destroy()
    g_playerVeh.delete(player)
  }
  return next()
})

function spawnVehicle(player: Player, modelId: number) {
  const pos = player.getPos()
  if (!pos)
    return player.sendClientMessage(ColorEnum.Red, '[交通工具] 无法获取您的坐标')
  const { x, y, z } = pos
  let angle = 0
  if (player.isInAnyVehicle()) {
    const veh = player.getVehicle()!
    angle = veh.getZAngle()
  }
  else {
    angle = player.getFacingAngle()
  }
  // 判断玩家是否已经有过一辆车了，有过的话就把玩家放到车外然后删除原来的车
  const p_veh = g_playerVeh.get(player)
  if (p_veh && p_veh.isValid()) {
    player.setPos(x, y, z)
    p_veh.destroy()
    g_playerVeh.delete(player)
  }

  const newVeh = new Vehicle({
    modelId,
    x,
    y,
    z,
    zAngle: angle,
    color: [-1, -1],
    respawnDelay: 0,
  })
  newVeh.create()
  g_playerVeh.set(player, newVeh)
  newVeh.setVirtualWorld(player.getVirtualWorld())
  newVeh.linkToInterior(player.getInterior())
  newVeh.addComponent(1010)
  newVeh.putPlayerIn(player, 0)
  player.sendClientMessage(ColorEnum.White, `[交通工具]刷车成功，输入/cc 可换颜色，车辆模型(${vehicleNames[modelId - 400]}[${modelId}])`)
  // todo 观战的player需要重新观战车辆和对应车的速度textDraw
}

PlayerEvent.onCommandText(['c, veh'], ({ player, subcommand, next }) => {
  if (!subcommand[0] || Number.isNaN(+subcommand[0])) {
    player.sendClientMessage(ColorEnum.LightBlue, '  ————刷车帮助————')
    player.sendClientMessage(ColorEnum.LightBlue, ' /c [车辆ID]来刷车，车辆ID为400-611')
    player.sendClientMessage(ColorEnum.LightBlue, ' /cc 颜色代码 颜色代码 更换车辆颜色')
    player.sendClientMessage(ColorEnum.LightBlue, ' /f 翻车 /c kick 踢人 /c wode 刷出你刷过的车')
    player.sendClientMessage(ColorEnum.LightBlue, ' /c lock 锁车 /c chepai 更换车牌 /c list图片刷车 /c 3d显示/隐藏3D速度表')
    return next()
  }
  const modelId = +subcommand[0]
  if (modelId < 400 || modelId > 611) {
    player.sendClientMessage(ColorEnum.White, '[交通工具] 车辆ID必须在{FFFFFF}400-611之间！')
    return next()
  }
  spawnVehicle(player, modelId)
  return next()
})

PlayerEvent.onCommandText(['c list, veh list'], async ({ player, next }) => {
  await new Dialog({
    style: DialogStylesEnum.LIST,
    caption: '------------刷车列表-------',
    info: '\n跑车\n警车\n飞机\n摩托\n船\n越野\n拖车\n货车\n火车及玩具车\n民政车\n其他车',
    button1: '确定',
    button2: '取消',
  }).show(player)
  // todo 重写mSelection
  return next()
})

PlayerEvent.onCommandText(['c kick, veh kick'], ({ player, next }) => {
  const p_veh = g_playerVeh.get(player)
  if (!p_veh) {
    player.sendClientMessage(ColorEnum.Orange, '[交通工具]你都没车, 踢什么人?')
    return next()
  }
  const playersOnVeh = Player.getInstances().filter((p) => {
    if (!p.isConnected() || !p.isNpc() || !p.isInAnyVehicle() || p === player)
      return false
    if (p.getVehicle() !== p_veh)
      return false
    const { x, y, z } = p.getPos()!
    p.setPos(x, y, z + 5)
    p.sendClientMessage(ColorEnum.Orange, `[交通工具] 该车现在属于 ${player.getName()} , 已经上锁.`)
    return true
  })
  if (playersOnVeh.length > 0) {
    player.sendClientMessage(ColorEnum.Orange, `[交通工具] 成功踢出${playersOnVeh.length}个玩家`)
    return next()
  }
  return next()
})

PlayerEvent.onCommandText(['c wode, veh wode'], ({ player, next }) => {
  const p_veh = g_playerVeh.get(player)
  if (!p_veh) {
    player.sendClientMessage(ColorEnum.Orange, '[交通工具]你都没车, 叫什么车?')
    return next()
  }

  const pos = player.getPos()
  if (!pos) {
    player.sendClientMessage(ColorEnum.Red, '[交通工具] 无法获取您的坐标')
    return next()
  }
  const { x, y, z } = pos
  let angle = 0
  if (player.isInAnyVehicle()) {
    const veh = player.getVehicle()!
    angle = veh.getZAngle()
  }
  else {
    angle = player.getFacingAngle()
  }
  p_veh.setPos(x, y, z)
  p_veh.setZAngle(angle)
  p_veh.setVirtualWorld(player.getVirtualWorld())
  p_veh.linkToInterior(player.getInterior())
  p_veh.addComponent(1010)
  p_veh.putPlayerIn(player, 0)
  return next()
})

PlayerEvent.onCommandText(['c color, veh color', 'cc'], ({ player, subcommand, next }) => {
  const p_veh = g_playerVeh.get(player)
  if (!p_veh) {
    player.sendClientMessage(ColorEnum.Red, '[交通工具] 你都没车')
    return next()
  }
  if (!player.isInAnyVehicle()) {
    player.sendClientMessage(ColorEnum.Red, '[交通工具] 错误:你不在车上')
    return next()
  }
  const [color1, color2] = subcommand.map(item => +item)
  if (!(color1) || !(color2)) {
    player.sendClientMessage(ColorEnum.Red, '[交通工具] 格式:/cc 颜色 颜色')
    return next()
  }
  if (color1 < 0 || color1 > 255) {
    player.sendClientMessage(ColorEnum.Red, '[交通工具] 错误颜色代码，车辆颜色代码为0-255')
    return next()
  }
  p_veh.changeColors(color1, color2 || color1)
  player.sendClientMessage(ColorEnum.White, '[交通工具] 你更换了车辆的颜色！')
  return next()
})

PlayerEvent.onCommandText(['c lock, veh lock'], ({ player, next }) => {
  const p_veh = g_playerVeh.get(player)
  if (!p_veh) {
    player.sendClientMessage(ColorEnum.Red, '[交通工具] 你都没车, 锁什么车?')
    return next()
  }
  const { doors } = p_veh.getParamsEx()
  const isLocked = doors < 1
  p_veh.toggleDoors(isLocked)
  if (isLocked) {
    player.sendClientMessage(ColorEnum.Orange, '[交通工具] 你的车已上锁')
  }
  else {
    player.sendClientMessage(ColorEnum.Orange, '[交通工具] 你的车已解锁')
  }
  return next()
})

PlayerEvent.onCommandText(['c chepai, veh chepai'], ({ player, subcommand, next }) => {
  const p_veh = g_playerVeh.get(player)
  if (!p_veh) {
    player.sendClientMessage(ColorEnum.Red, '[交通工具] 你都没车')
    return next()
  }
  const [plateNumber] = subcommand[0]
  if (!plateNumber) {
    player.sendClientMessage(ColorEnum.Red, '[交通工具] 用法:/c chepai 要设置的车牌')
    return next()
  }
  if (plateNumber.length > 10) {
    player.sendClientMessage(ColorEnum.Red, '[交通工具] 错误:只能输入5位汉字或10位英文字母')
    return next()
  }
  if (player.getVehicle() !== p_veh) {
    player.sendClientMessage(ColorEnum.Red, '[交通工具] 错误:你不在自己的载具上')
    return next()
  }
  p_veh.setNumberPlate(plateNumber)
  player.sendClientMessage(ColorEnum.White, '[交通工具] 更换车牌成功')
  return next()
})

PlayerEvent.onCommandText(['c 3d, veh 3d'], ({ player, next }) => {
  const p_veh = g_playerVeh.get(player)
  if (!p_veh) {
    player.sendClientMessage(ColorEnum.Red, '[交通工具] 你都没车')
    return next()
  }
  if (!player.isInAnyVehicle()) {
    player.sendClientMessage(ColorEnum.Red, '[交通工具] 错误:你不在车上')
    return next()
  }
  if (player.getVehicle() !== p_veh) {
    player.sendClientMessage(ColorEnum.Red, '[交通工具] 错误:你不在自己的载具上')
    return next()
  }
  // todo
  // if (g_playerInfo.get(player).is3dSpeedVisible) {
  //   toggle3dSpeed(playerid, false)
  //   player.sendClientMessage(ColorEnum.White, '[交通工具]已隐藏3D速度表')
  //   return next()
  // }
  // toggle3dSpeed(player, true)
  // player.sendClientMessage(ColorEnum.White, '[交通工具]已显示3D速度表')
  return next()
})
