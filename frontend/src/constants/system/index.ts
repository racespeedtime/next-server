export enum RouteTypeEnum {
  MENU = 0,
  PAGE = 1,
  BUTTON = 2,
}

export const routeTypeOptions = [
  {
    label: '目录',
    value: RouteTypeEnum.MENU,
  },
  {
    label: '页面',
    value: RouteTypeEnum.PAGE,
    type: 'warning',
  },
  {
    label: '按钮',
    value: RouteTypeEnum.BUTTON,
    type: 'success',
  },
]
