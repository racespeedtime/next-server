// 定义选项卡tabs小仓库（选择式Api写法）
import { defineStore } from 'pinia'
import store from '../index'
import router from '@/routers/index.ts'
import { useKeepAliveStore } from '@/stores/modules/keepAlive.ts'

const keepAliveStore = useKeepAliveStore(store)

export const useTabsStore = defineStore('tabs', {
  // 开启数据持久化
  persist: {
    storage: sessionStorage,
  },

  state: () => {
    return {
      tabList: [] as any[], // 选项卡
    }
  },
  actions: {
    // 添加选项卡数据
    async addTab(tab: any) {
      // const keepAliveStore = useKeepAliveStore();
      // 判断是否已经添加过此条数据，只要数组中有一个元素满足条件，就返回 true。
      const isTab = this.tabList.some((item: any) => {
        return item.path === tab.path
      })
      if (isTab)
        return
      if (
        !keepAliveStore.keepAliveName.includes(tab.name)
        && tab.isKeepAlive
      )
        keepAliveStore.addKeepAliveName(tab.name)

      this.tabList.push(tab)
    },
    // 删除选项卡数据
    async removeTab(tabPath: string, isCurrent: boolean = true) {
      if (isCurrent) {
        this.tabList.forEach((item, index) => {
          if (item.path !== tabPath)
            return
          // 找到下一个选项卡或上一个选项卡。通过计算索引值可以得到下一个选项卡的位置，即 this.tabList[index + 1]；如果不存在下一个选项卡，则返回上一个选项卡的位置，即 this.tabList[index - 1]。
          const nextTab = this.tabList[index + 1] || this.tabList[index - 1]
          if (!nextTab)
            return
          // 如果找到了下一个或上一个选项卡，则使用路由导航方法（假设是 router.push）将页面跳转到该选项卡对应的路径。
          router.push(nextTab.path)
        })
      }
      // 删除选项卡路由缓存
      const tabItem = this.tabList.find(item => item.path === tabPath)
      tabItem?.isKeepAlive && keepAliveStore.removeKeepAliveName(tabItem.name)
      // 将这个需要删除的选项卡过滤掉，重新赋值给选项卡数组。
      this.tabList = this.tabList.filter(item => item.path !== tabPath)
    },
    // 用来清空Tabs缓存
    async setTab(tabList: any[]) {
      this.tabList = tabList
    },
    // 设置选项卡标题
    async setTabTitle(title: string) {
      // 根据当前标签页的path进行替换，tabList持久化数据里面的标签名称
      this.tabList.forEach((item) => {
        if (item.path === router.currentRoute.value.path)
          item.title = title
      })
    },
    // 关闭左边 OR 右边选项卡
    async closeSideTabs(path: string, type: 'left' | 'right') {
      const currentIndex = this.tabList.findIndex(item => item.path === path)
      if (currentIndex !== -1) {
        const range
          = type === 'left'
            ? [0, currentIndex]
            : [currentIndex + 1, this.tabList.length]
        this.tabList = this.tabList.filter((item, index) => {
          return index < range[0] || index >= range[1] || !item.close
        })
      }
      // 重新设置路由缓存，将新的tabList的name覆盖keepAliveList
      const keepAliveList = this.tabList.filter(item => item.isKeepAlive)
      keepAliveStore.setKeepAliveName(keepAliveList.map(item => item.name))
      if (type === 'right') {
        this.tabList.forEach((_, index) => {
          // 找到下一个选项卡或上一个选项卡。通过计算索引值可以得到下一个选项卡的位置，即 this.tabList[index + 1]；如果不存在下一个选项卡，则返回上一个选项卡的位置，即 this.tabList[index - 1]。
          const nextTab
            = this.tabList[index]
            || this.tabList[index + 1]
            || this.tabList[index - 1]
          if (!nextTab)
            return
          // 如果找到了下一个或上一个选项卡，则使用路由导航方法（假设是 router.push）将页面跳转到该选项卡对应的路径。
          router.push(nextTab.path)
        })
      }
    },
    // 关闭多个选项卡，若tabValue传递有值并且选项卡数组中存在，则关闭除自己和固定选项卡之外的所有选项卡[关闭其他选项卡]，若tabValue不传值，则关闭除固定选项卡之外的所有选项卡[关闭所有选项卡]。
    async closeManyTabs(tabValue?: string) {
      this.tabList = this.tabList.filter((item) => {
        return item.path === tabValue || !item.close
      })
      // 重新设置路由缓存，将新的tabList的name覆盖keepAliveList
      const keepAliveList = this.tabList.filter(item => item.isKeepAlive)
      keepAliveStore.setKeepAliveName(keepAliveList.map(item => item.name))
    },
  },
  getters: {
    // 获取选项卡state数据变量
    getTabs(state) {
      return state.tabList
    },
  },
})
