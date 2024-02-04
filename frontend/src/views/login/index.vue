<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { msgSuccess, noticeSuccess } from '@/utils/msgNotice'
import { useKeepAliveStore } from '@/stores/modules/keepAlive.ts'
import { HOME_URL } from '@/config/index.ts'
import { useTabsStore } from '@/stores/modules/tabs.ts'
import { userApi } from '@/api/system/user'
import type { LoginUser } from '@/api/system/user/type'
import { useAuthStore } from '@/stores/modules/auth.ts'

const authStore = useAuthStore()
const tabsStore = useTabsStore()
const keepAliveStore = useKeepAliveStore()
const router = useRouter()

const loginFormRef = ref<FormInstance>()
const loading = ref(false)

const loginForm = reactive<LoginUser>({
  username: 'admin',
  password: '123456',
})

const loginRules = reactive<FormRules<LoginUser>>({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
})

/** 登录 */
function handleLogin() {
  loginFormRef.value!.validate(async (valid) => {
    if (!valid) {
      noticeSuccess('校验失败，信息填写有误')
      return
    }

    try {
      loading.value = true
      // 1、执行登录接口
      const { token, user } = await userApi.login(loginForm)

      // 2、清空 tabs数据、keepAlive缓存数据
      tabsStore.setTab([])
      keepAliveStore.setKeepAliveName([])

      // 3. 设置用户token和信息
      authStore.setToken(token)
      authStore.setUserInfo(user)

      // 4、跳转到首页,触发路由前置守卫的动态路由
      msgSuccess('登录成功')
      router.push(HOME_URL)
    }
    finally {
      loading.value = false
    }
  })
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-full">
    <h1>登录</h1>
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
      <el-form-item prop="userName">
        <el-input
          v-model="loginForm.username"
          type="text"
          placeholder="请输入用户名"
          suffix-icon="User"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="请输入密码"
          show-password
          suffix-icon="Lock"
        />
      </el-form-item>
    </el-form>
    <el-button block :disabled="loading" @click="handleLogin">
      {{ loading ? "登录中" : "登录" }}
    </el-button>
  </div>
</template>
