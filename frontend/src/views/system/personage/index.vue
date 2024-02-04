<script setup lang="ts" name="personagePage">
import { msgError, msgSuccess } from '@/utils/msgNotice'
import { useAuthStore } from '@/stores/modules/auth'

const { userInfo, getUserRolesName } = storeToRefs(useAuthStore())

// el-card标签选中name
const activeName = ref('first')

/** 基本资料开始  */

// form表单Ref
const mineFormRef = ref<any>()
// form表单
const mineForm = ref<any>({
  loginName: '',
  phone: '',
  email: '',
  sex: '3',
})
/** 清空表单数据 */
function resetMineForm() {
  mineForm.value = {
    loginName: '',
    phone: '',
    email: '',
    sex: '3',
  }
}
/** 表单规则 */
const mineRules = reactive({
  loginName: [{ required: true, message: '请输入登录名称', trigger: 'change' }],
  phone: [{ required: true, message: '请输入手机号码', trigger: 'change' }],
})

/** 保存 */
function handleMineSave() {
  if (!mineFormRef.value)
    return;
  (mineFormRef.value as any).validate(async (valid: any) => {
    if (valid)
      msgSuccess('保存成功')
    else msgError('验证失败，请检查填写内容')
  })
}

/** 基本资料结束  */

/** 修改密码开始  */
// form表单Ref
const pwdFormRef = ref<any>()
// form表单
const pwdForm = ref<any>({
  password: '',
  newPassword: '',
  confirmPassword: '',
})
/** 清空表单数据 */
function resetPwdForm() {
  pwdForm.value = {
    password: '',
    newPassword: '',
    confirmPassword: '',
  }
}
/** 表单规则 */
const pwdRules = reactive({
  password: [{ required: true, message: '请输入旧密码', trigger: 'change' }],
  newPassword: [{ required: true, message: '请输入新密码', trigger: 'change' }],
  confirmPassword: [
    { required: true, message: '请输入确认密码', trigger: 'change' },
  ],
})

/** 保存 */
function handlePwdSave() {
  if (!pwdFormRef.value)
    return;
  (pwdFormRef.value as any).validate(async (valid: any) => {
    if (valid)
      msgSuccess('保存成功')
    else msgError('验证失败，请检查填写内容')
  })
}
/** 修改密码结束  */
</script>

<template>
  <el-row :gutter="20">
    <el-col :lg="8">
      <el-card mb-18px>
        <div class="text-13px card ">
          <div class="flex justify-between p-y-12px">
            <div class="flex items-center">
              <el-icon size="15">
                <User />
              </el-icon>
              <div class="p-l-2px">
                用户名称
              </div>
            </div>
            <div v-text="userInfo.username" />
          </div>
          <div class="flex justify-between p-y-12px">
            <div class="flex items-center">
              <el-icon size="15">
                <Collection />
              </el-icon>
              <div class="p-l-2px">
                所属角色
              </div>
            </div>
            <div v-text="getUserRolesName" />
          </div>
          <div class="flex justify-between p-y-12px">
            <div class="flex items-center">
              <el-icon size="15">
                <Calendar />
              </el-icon>
              <div class="p-l-2px">
                创建日期
              </div>
            </div>
            <div v-text="userInfo.createdAt" />
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :lg="16">
      <el-card :body-style="{ 'padding-top': '6px' }">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基本资料" name="first">
            <el-form
              ref="mineFormRef"
              :rules="mineRules"
              :model="mineForm"
              label-width="80px"
              status-icon
            >
              <el-row>
                <el-col :xs="{ span: 24 }" :sm="{ span: 24 }">
                  <el-form-item label="登录名称" prop="loginName">
                    <el-input
                      v-model="mineForm.loginName"
                      placeholder="请输入登录名称"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="{ span: 24 }" :sm="{ span: 24 }">
                  <el-form-item label="手机号码" prop="phone">
                    <el-input
                      v-model="mineForm.phone"
                      placeholder="请输入手机号码"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="{ span: 24 }" :sm="{ span: 24 }">
                  <el-form-item label="邮箱" prop="email">
                    <el-input
                      v-model="mineForm.email"
                      placeholder="请输入邮箱"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="{ span: 24 }" :sm="{ span: 24 }" class="mt-6px">
                  <el-form-item>
                    <el-button type="primary" plain @click="handleMineSave">
                      保存
                    </el-button>
                    <el-button type="danger" plain @click="resetMineForm">
                      重置
                    </el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            {{ mineForm }}
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="second">
            <el-form
              ref="pwdFormRef"
              :rules="pwdRules"
              :model="pwdForm"
              label-width="80px"
              status-icon
            >
              <el-row>
                <el-col :xs="{ span: 24 }" :sm="{ span: 24 }">
                  <el-form-item label="密码" prop="password">
                    <el-input
                      v-model="pwdForm.password"
                      placeholder="请输入旧密码"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="{ span: 24 }" :sm="{ span: 24 }">
                  <el-form-item label="新密码" prop="newPassword">
                    <el-input
                      v-model="pwdForm.newPassword"
                      placeholder="请输入新密码"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="{ span: 24 }" :sm="{ span: 24 }">
                  <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input
                      v-model="pwdForm.confirmPassword"
                      placeholder="请输入确认密码"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="{ span: 24 }" :sm="{ span: 24 }" class="mt-6px">
                  <el-form-item>
                    <el-button type="primary" plain @click="handlePwdSave">
                      保存
                    </el-button>
                    <el-button type="danger" plain @click="resetPwdForm">
                      重置
                    </el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            {{ pwdForm }}
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.card {
  color: #000000;

  @apply dark:text-#E5EAF3;
}
</style>
