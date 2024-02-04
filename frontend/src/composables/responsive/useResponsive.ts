import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export function useResponsive() {
  const breakpoints = useBreakpoints(breakpointsTailwind)

  const isMobile = breakpoints.smaller('sm')
  const isPad = breakpoints.between('sm', 'md')
  const isDesktop = breakpoints.greater('md')

  const md = breakpoints.between('md', 'lg')
  const lg = breakpoints.between('lg', 'xl')
  const xl = breakpoints.between('xl', '2xl')
  const xxl = breakpoints['2xl']

  const current = computed(() => {
    if (isMobile.value)
      return 'xs'
    if (isPad.value)
      return 'sm'
    if (md.value)
      return 'md'
    if (lg.value)
      return 'lg'
    if (xl.value)
      return 'xl'
    return 'xxl'
  })

  return {
    breakpoints,
    isMobile,
    isPad,
    isDesktop,

    xs: isMobile,
    sm: isPad,
    md,
    lg,
    xl,
    xxl,

    current,
  }
}
