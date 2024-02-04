<script setup lang="ts">
import { LOGIN_URL } from '@/config'
import { useAuthStore } from '@/stores/modules/auth'
import { useTabsStore } from '@/stores/modules/tabs'
import { useGlobalStore } from '@/stores/modules/global'

const router = useRouter()
const authStore = useAuthStore()
const tabStore = useTabsStore()
const globalStore = useGlobalStore()

// 退出登录
function handleLogout() {
  authStore.$reset()
  tabStore.$reset()
  globalStore.$reset()

  // 必须使用这个把页面缓存刷掉
  window.location.replace(LOGIN_URL)
}

// 下拉折叠
function handleCommand(command: string | number) {
  switch (command) {
    case 'mine':
      router.push('/system/personage')
      break
    case 'logout':
      handleLogout()
      break
  }
}
</script>

<template>
  <el-dropdown class="m-l-10px" :hide-on-click="false" @command="handleCommand">
    <div class="flex items-center gap-4px outline-none">
      <el-avatar
        :size="34"
        :src="authStore.userInfo.avatar"
      >
        {{ authStore.userInfo.username.slice(0, 1) }}
      </el-avatar>
      <div class="hidden md:block text-primary">
        <span>{{ authStore.userInfo.username }}</span>
        <span>{{ authStore.getUserRolesName }}</span>
        <el-icon><arrow-down /></el-icon>
      </div>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="mine">
          个人中心
        </el-dropdown-item>
        <el-dropdown-item command="logout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
