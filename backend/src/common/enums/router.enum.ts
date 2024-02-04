export enum RouterType {
  LAYOUT_OR_SUBMENU = 0,
  PAGE = 1,
  BUTTON = 2,
}

const routerTypeRaw = Object.values(RouterType)

export const RouterTypeArray = routerTypeRaw.slice(routerTypeRaw.length / 2)
