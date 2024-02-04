<script setup lang="tsx" name="UserList">
import { cloneDeep } from 'lodash-es'
import {
  msgBox,
  msgError,
  msgInfo,
  msgWarning,
  noticeError,
  noticeSuccess,
} from '@/utils/msgNotice'

import { userApi } from '@/api/system/user'

import { roleApi } from '@/api/system/role/index.ts'
import { useTable } from '@/composables/table/useTable'

/** 添加 AND 修改抽屉 */
const drawerRef = ref()
// 标题
const title = ref('用户类型管理')

// form表单Ref
const formRef = ref<any>()
// form表单
const form = ref<any>(resetForm())

// 数据表格数据
const tableList = ref<any>([])

const checkedUserIds = ref([]) // 选中数组
const single = ref<boolean>(true) // 非单个禁用
const multiple = ref<boolean>(true) // 非多个禁用
/** 是否多选 */
function handleSelectionChange(selection: any) {
  console.log(selection)
  checkedUserIds.value = selection.map((item: any) => item.id)
  single.value = selection.length !== 1 // 单选
  multiple.value = !selection.length // 多选
}

/** 添加 */
function handleAdd() {
  // 重置表单
  form.value = resetForm()
  // 标题
  title.value = '用户添加'
  drawerRef.value.open()
}

/** 回显数据 */
async function handleEcho(id: any) {
  console.log('回显数据ID', id)
  if (!id) {
    msgWarning('请选择需要修改的数据')
    return
  }
  try {
    const res = await userApi.getById(id)
    console.log(res)
    form.value = res
  }
  catch (error) {
    noticeError('数据获取失败，请刷新重试')
    console.log(error)
  }
}

/** 修改 */
async function handleUpdate(row?: any) {
  // 重置表单
  resetForm()
  // 标题
  title.value = '用户修改'
  const id = row ? row.id : checkedUserIds.value[0]
  if (!id)
    msgError('请选中需要修改的数据')

  console.log(id)
  // 回显数据
  handleEcho(id)
  drawerRef.value.open()
}

function resetForm() {
  return {
    username: '',
    password: '',
    checkPass: '',
  }
}

/** 清空表单数据 */

/** 表单规则 */

const rules = computed(() => {
  const commonRule = {
    username: [
      { required: true, message: '请输入用户名字', trigger: 'blur' },
      {
        min: 1,
        max: 16,
        message: '用户名字长度在 1 到 16 个字符',
      },
    ],
  }

  if (!form.value.id) {
    Object.assign(commonRule, {
      password: [
        {
          required: true,
          validator(_, value, callback) {
            if (value === '') {
              callback(new Error('请输入用户密码'))
            }
            else {
              if (form.value.checkPass !== '') {
                if (!formRef.value)
                  return
                formRef.value.validateField('checkPass', () => null)
              }
              callback()
            }
          },
        },
        {
          min: 1,
          max: 16,
          message: '用户密码在 1 到 16 个字符',
        },
      ],
      checkPass: [
        { required: true, message: '请输入用户密码', trigger: 'blur' },
        {
          validator(_, value, callback) {
            if (value === form.value.password)
              callback()
            else
              callback(new Error('两次输入密码不一致!'))
          },
          trigger: 'change',
        },
      ],
    })
  }
  return commonRule
})

const { Table, getList: handleListPage } = useTable({
  request: userApi.listPage,
  slots: {
    toolbar() {
      return (
        <el-row gutter={10}>
          <el-col span={1.5}>
            <el-button type="primary" icon="plus" plain onClick={handleAdd}>
              新增
            </el-button>
          </el-col>
          <el-col span={1.5}>
            <el-button
              type="success"
              icon="edit"
              plain
              disabled={single.value}
              onClick={handleUpdate}
            >
              修改
            </el-button>
          </el-col>
          <el-col span={1.5}>
            <el-button
              type="danger"
              icon="delete"
              plain
              disabled={multiple.value}
              onClick={handleBatchDelete}
            >
              删除
            </el-button>
          </el-col>
          <el-col span={1.5}>
            <el-button
              type="primary"
              icon="edit"
              plain
              disabled={single.value}
              onClick={handleAssignRoles}
            >
              分配角色
            </el-button>
          </el-col>
          <el-col span={1.5}>
            <el-button type="warning" icon="download" plain>
              导出
            </el-button>
          </el-col>
          <el-col span={1.5}>
            <el-button type="info" icon="upload" plain>
              导入
            </el-button>
          </el-col>
        </el-row>
      )
    },
  },
  tableProps: {
    'onSelection-change': handleSelectionChange,
  },
  searchItems: [
    {
      type: 'input',
      prop: 'username',
      label: '用户名',
    },
    {
      type: 'select',
      prop: 'gender',
      label: '性别',
      options: [
        {
          label: '男',
          value: 0,
        },
        {
          label: '女',
          value: 1,
        },
      ],
    },
    {
      type: 'datePicker',
      prop: 'createdAt',
      label: '创建时间',
      mapFields: ['createdAtStart', 'createdAtEnd'],
      props: {
        type: 'daterange',
      },
    },
  ],
  columns: [
    { type: 'selection', width: '55', align: 'center' },
    { label: 'id', prop: 'id', width: '200px', align: 'center' },
    {
      label: '用户名称',
      prop: 'username',
      align: 'center',
    },
    { label: '创建时间', prop: 'createdAt', align: 'center' },
    {
      label: '操作',
      align: 'center',
      width: '120',
      fixed: 'right',
      render(row) {
        return (
          <>
            <el-tooltip content="修改" placement="top">
              {/* <!-- v-auth="['system:role:update']" --> */}
              <el-button
                type="primary"
                icon="Edit"
                circle
                plain
                onClick={() => handleUpdate(row)}
              />
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              {/* <!-- v-auth="['system:role:delete']" --> */}
              <el-button
                type="danger"
                icon="Delete"
                circle
                plain
                onClick={() => handleDelete(row)}
              />
            </el-tooltip>
          </>
        )
      },
    },
  ],
})

// 确定按钮是否显示loading
const confirmLoading = ref(false)
/** 确定  */
function handleConfirm() {
  if (!formRef.value)
    return
  confirmLoading.value = true;
  (formRef.value as any).validate(async (valid: any) => {
    if (!valid) {
      msgError('验证失败，请检查填写内容')
      confirmLoading.value = false
      return
    }
    console.log('表单ID', form.value.id)

    try {
      await userApi[form.value.id ? 'update' : 'add'](form.value)
      noticeSuccess(form.value.id ? '修改成功' : '添加成功')
      confirmLoading.value = false
      drawerRef.value.quickClose()
      form.value = resetForm()
      handleListPage()
    }
    catch (error) {
      console.log(error)
    }
    confirmLoading.value = false
  })
}

/** 取消 */
function handleCancel() {
  drawerRef.value.close()
}

// 右侧选中数据，必须是['1']数据
const transferRightList = ref([])
const transferLeftList = ref<any>([])

// 分配角色弹出框
const dialogRef = ref()
/** 分配角色 */
async function handleAssignRoles() {
  try {
    const user = tableList.value.find(u => u.id === checkedUserIds.value[0])
    const res = await roleApi.role({ isAll: true })
    transferLeftList.value = res
    transferRightList.value = cloneDeep(user.roles?.map(r => r.id) || [])
  }
  catch (error) {
    console.log(error)
    msgError('加载角色数据失败')
  }
  dialogRef.value.open()
}

// 右侧列表元素变化时触发
async function handleTransferChange(roleIds: any) {
  try {
    await roleApi.assignUserRole({ roleIds, userId: checkedUserIds.value[0] })
    noticeSuccess('分配角色成功')
  }
  catch {
    handleAssignRoles()
  }
}

/** 删除 */
async function handleDelete(row: any) {
  const id = row.id
  if (!id)
    msgWarning('请选中需要删除的数据')
  await msgBox(`您确认需要删除用户名称[${row.username}]么？`)
  await userApi.deleteById(id)
  handleListPage()
  noticeSuccess('删除成功')
}

/** 批量删除 */
async function handleBatchDelete() {
  if (!checkedUserIds.value.length) {
    msgInfo('请选择需要删除的数据')
    return
  }
  await msgBox('您确认需要进行批量删除么？')
  await userApi.batchDelete(checkedUserIds.value)
  handleListPage()
  noticeSuccess('批量删除成功')
}
</script>

<template>
  <div class="table-box">
    <el-card shadow="never">
      <Table />
    </el-card>
    <!-- 添加 OR 修改 -->
    <Drawer
      ref="drawerRef"
      :title="title"
      :loading="confirmLoading"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <template #content>
        <el-form
          ref="formRef"
          :rules="rules"
          :model="form"
          label-width="80px"
          status-icon
        >
          <el-form-item label="用户名称" prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入用户名称"
              clearable
            />
          </el-form-item>
          <el-form-item v-if="!form.id" label="用户密码" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入用户密码"
              clearable
            />
          </el-form-item>
          <el-form-item v-if="!form.id" label="再次确认密码" prop="checkPass">
            <el-input
              v-model="form.checkPass"
              type="password"
              placeholder="请再次确认密码"
              clearable
            />
          </el-form-item>
        </el-form>
        {{ form }}
      </template>
    </Drawer>

    <Dialog
      ref="dialogRef"
      title="分配角色"
      :height="450"
      :loading="confirmLoading"
      :footer-hidden="true"
    >
      <template #content>
        <div class="flex flex-justify-center">
          <el-transfer
            v-model="transferRightList"
            :props="{
              key: 'id',
              label: 'name',
            }"
            :titles="['角色列表', '拥有角色']"
            target-order="original"
            filterable
            filter-placeholder="关键字搜索"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}',
            }"
            :data="transferLeftList"
            @change="handleTransferChange"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>
