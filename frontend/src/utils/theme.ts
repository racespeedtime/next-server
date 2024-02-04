import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { DEFAULT_THEME } from '@/config/index.ts'
import { useGlobalStore } from '@/stores/modules/global.ts'
import { asideTheme, headerTheme, menuTheme } from '@/config/theme.ts'

/** 主题切换方式[推荐] */
/**
 * @description hex颜色转rgb颜色
 * @param {string} str 颜色值字符串
 * @returns {string} 返回处理后的颜色值
 */
export function hexToRgb(str: any) {
  let hexs: any = ''
  const reg = /^\#?[0-9A-Fa-f]{6}$/
  if (!reg.test(str))
    return ElMessage.warning('输入错误的hex')
  str = str.replace('#', '')
  hexs = str.match(/../g)
  for (let i = 0; i < 3; i++) hexs[i] = Number.parseInt(hexs[i], 16)
  return hexs
}

/**
 * @description rgb颜色转Hex颜色
 * @param {*} r 代表红色
 * @param {*} g 代表绿色
 * @param {*} b 代表蓝色
 * @returns {string} 返回处理后的颜色值
 */
export function rgbToHex(r: any, g: any, b: any) {
  const reg = /^\d{1,3}$/
  if (!reg.test(r) || !reg.test(g) || !reg.test(b))
    return ElMessage.warning('输入错误的rgb颜色值')
  const hexs = [r.toString(16), g.toString(16), b.toString(16)]
  for (let i = 0; i < 3; i++) {
    if (hexs[i].length === 1)
      hexs[i] = `0${hexs[i]}`
  }

  return `#${hexs.join('')}`
}

/**
 * @description 加深颜色值
 * @param {string} color 颜色值字符串
 * @param {number} level 加深的程度，限0-1之间
 * @returns {string} 返回处理后的颜色值
 */
export function getDarkColor(color: string, level: number) {
  const reg = /^\#?[0-9A-Fa-f]{6}$/
  if (!reg.test(color))
    return ElMessage.warning('输入错误的hex颜色值')
  const rgb = hexToRgb(color)
  for (let i = 0; i < 3; i++)
    rgb[i] = Math.round(20.5 * level + rgb[i] * (1 - level))
  return rgbToHex(rgb[0], rgb[1], rgb[2])
}

/**
 * @description 变浅颜色值
 * @param {string} color 颜色值字符串
 * @param {number} level 加深的程度，限0-1之间
 * @returns {string} 返回处理后的颜色值
 */
export function getLightColor(color: string, level: number) {
  const reg = /^\#?[0-9A-Fa-f]{6}$/
  if (!reg.test(color))
    return ElMessage.warning('输入错误的hex颜色值')
  const rgb = hexToRgb(color)
  for (let i = 0; i < 3; i++)
    rgb[i] = Math.round(255 * level + rgb[i] * (1 - level))
  return rgbToHex(rgb[0], rgb[1], rgb[2])
}

/**
 * @description 全局主题配置
 */
export function useTheme() {
  const globalStore = useGlobalStore()
  const { isDark, themeColor, isGrey } = storeToRefs(globalStore)

  // 切换暗黑模式 ==> 同时修改主题颜色、侧边栏、头部颜色

  // 修改主题颜色
  const changeThemeColor = (val: string | null) => {
    if (!val || val === DEFAULT_THEME)
      val = DEFAULT_THEME
      // ElMessage({ type: "success", message: `主题颜色已重置为默认主题` });

    // 计算主题颜色变化
    document.documentElement.style.setProperty('--el-color-primary', val)
    document.documentElement.style.setProperty(
      '--el-color-primary-dark-2',
      isDark.value ? `${getLightColor(val, 0.2)}` : `${getDarkColor(val, 0.3)}`,
    )
    for (let i = 1; i <= 9; i++) {
      const primaryColor = isDark.value
        ? `${getDarkColor(val, i / 10)}`
        : `${getLightColor(val, i / 10)}`
      document.documentElement.style.setProperty(
        `--el-color-primary-light-${i}`,
        primaryColor,
      )
    }
    globalStore.setGlobalState('themeColor', val)
  }

  // 灰色切换
  const changeGrey = (value: boolean) => {
    const body = document.body
    if (!value)
      body.removeAttribute('style')
    else
      body.setAttribute('style', 'filter: grayscale(1)')

    globalStore.setGlobalState('isGrey', value)
  }

  // 设置菜单样式
  const setMenuTheme = () => {
    let type = 'light'
    // 如果是黑色主题，直接为黑色
    if (isDark.value)
      type = 'dark'
    const theme = menuTheme[type!]
    for (const [key, value] of Object.entries(theme))
      document.documentElement.style.setProperty(key, value as string | null)
  }

  // 设置侧边栏样式
  const setAsideTheme = () => {
    let type = 'light'
    if (isDark.value)
      type = 'dark'
    const theme = asideTheme[type!]
    for (const [key, value] of Object.entries(theme))
      document.documentElement.style.setProperty(key, value as string | null)

    setMenuTheme()
  }

  // 设置头部样式
  const setHeaderTheme = () => {
    let type = 'light'
    if (isDark.value)
      type = 'dark'
    const theme = headerTheme[type!]
    for (const [key, value] of Object.entries(theme))
      document.documentElement.style.setProperty(key, value as string | null)

    setMenuTheme()
  }

  // 初始化主题配置
  const initThemeConfig = () => {
    changeThemeColor(themeColor.value)
    setAsideTheme()
    setHeaderTheme()
    if (isGrey.value)
      changeGrey(true)
  }

  return {
    initThemeConfig,
    changeThemeColor,
    changeGrey,
    setAsideTheme,
    setHeaderTheme,
  }
}
