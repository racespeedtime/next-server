<script setup lang="tsx" name="RolePage">
import {
  msgBox,
  msgError,
  msgInfo,
  msgWarning,
  noticeError,
  noticeSuccess,
} from '@/utils/msgNotice'

import { menuApi, roleApi } from '@/api'
import { useTable } from '@/composables/table/useTable'
import { generateTreeRoutesForEdit } from '@/utils/route'

const ids = ref([]) // 选中数组
const single = ref<boolean>(true) // 非单个禁用
const multiple = ref<boolean>(true) // 非多个禁用
/** 添加 AND 修改弹出框 */
const dialogRef = ref()
// 标题
const title = ref('角色管理')
// form表单Ref
const formRef = ref<any>()
// form表单
const form = ref<any>({
  id: null,
  name: '',
  code: '',
  isEnabled: true,
  sort: 0,
  remark: '',
})

const { Table, getList: handleListPage } = useTable({
  searchItems: [
    { label: '角色名称', prop: 'name', type: 'input' },
    { label: '角色编码', prop: 'code', type: 'input' },
  ],
  slots: {
    toolbar() {
      return (
        <el-row gutter={10}>
          {/* v-auth="['system:role:add']" */}
          <el-col span={1.5}>
            <el-button type="primary" icon="plus" plain onClick={handleAdd}>
              新增
            </el-button>
          </el-col>
          {/* v-auth="['system:role:update']" */}
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
          {/* v-auth="['system:role:delete']" */}
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
              type="success"
              icon="Postcard"
              plain
              disabled={single.value}
              onClick={handleAssignMenu}
            >
              分配菜单
            </el-button>
          </el-col>
        </el-row>
      )
    },
  },
  tableProps: {
    'onSelection-change': handleSelectionChange,
  },
  columns: [
    {
      type: 'selection',
      width: '55',
      align: 'center',
    },
    {
      label: 'id',
      prop: 'id',
      minWidth: '120px',
      align: 'center',
    },
    {
      label: '角色名称',
      prop: 'name',
      minWidth: '120px',
      align: 'center',
    },
    {
      label: '角色编号',
      prop: 'code',
      minWidth: '120px',
      align: 'center',
    },
    {
      label: '角色排序',
      prop: 'sort',
      minWidth: '100px',
      align: 'center',
    },
    {
      label: '创建时间',
      prop: 'createdAt',
      minWidth: '180px',
      align: 'center',
    },
    {
      label: '操作',
      align: 'center',
      width: '150px',
      fixed: 'right',
      render({ row }) {
        return (
          <>
            <el-tooltip content="修改" placement="top">
              <el-button
                type="primary"
                icon="Edit"
                circle
                plain
                onClick={() => handleUpdate(row)}
              />
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button
                type="danger"
                icon="Delete"
                circle
                plain
                onClick={() => handleDelete(row)}
              />
            </el-tooltip>

            <el-tooltip content="分配菜单" placement="top">
              <el-button
                type="info"
                icon="Postcard"
                circle
                plain
                onClick={() => handleAssignMenu(row)}
              />
            </el-tooltip>
          </>
        )
      },
    },
  ],
  request: roleApi.listPage,
})

/** 是否多选 */
function handleSelectionChange(selection: any) {
  console.log(selection)
  ids.value = selection.map((item: any) => item.id)
  single.value = selection.length !== 1 // 单选
  multiple.value = !selection.length // 多选
}

/** 添加 */
function handleAdd() {
  // 重置表单
  resetForm()
  // 标题
  title.value = '角色添加'
  // form.value.isEnabled = "0";
  dialogRef.value.open()
  noticeSuccess('添加')
}

/** 回显数据 */
async function handleEcho(id: any) {
  if (!id) {
    msgWarning('请选择需要修改的数据')
    return
  }
  try {
    const res = await roleApi.getById(id)
    console.log(res)
    form.value = res
  }
  catch (error) {
    console.log(error)
    noticeError('数据获取失败，请刷新重试')
  }
}

/** 修改 */
async function handleUpdate(row?: any) {
  // 重置表单
  resetForm()
  // 标题
  title.value = '角色修改'
  const id = row ? row.id : ids.value[0]
  if (!id)
    msgError('请选择需要修改的数据')

  console.log(id)
  // 回显数据
  handleEcho(id)
  dialogRef.value.open()
}

/** 清空表单数据 */
function resetForm() {
  formRef.value?.resetFields()
}
/** 表单规则 */
const rules = reactive({
  name: [{ required: true, message: '请输入角色名字', trigger: 'change' }],
  code: [{ required: true, message: '请输入角色编号', trigger: 'change' }],
  isEnabled: [
    { required: true, message: '请输入选择角色状态', trigger: 'change' },
  ],
  sort: [{ required: true, message: '请输入排序号', trigger: 'change' }],
})

// 确定按钮是否显示loading
const confirmLoading = ref(false)
/** 确定  */
function handleConfirm() {
  if (!formRef.value)
    return
  confirmLoading.value = true;
  (formRef.value as any).validate(async (valid: any) => {
    if (!valid)
      return
    try {
      if (form.value.id)
        await roleApi.update(form.value.id, form.value)
      else
        await roleApi.add(form.value)

      noticeSuccess('修改成功')
      confirmLoading.value = false
      dialogRef.value.quickClose()
      resetForm()
      handleListPage()
    }
    catch (error) {
      console.log(error)
      confirmLoading.value = false
      noticeError('修改失败，请刷新重试')
    }
  })
}

/** 取消 */
function handleCancel() {
  dialogRef.value.close()
}

/** 删除 */
function handleDelete(row: any) {
  const id = row.id
  if (!id)
    msgWarning('请选中需要删除的数据')

  msgBox(`您确认需要删除角色名称[${row.name}]么？`)
    .then(async () => {
      try {
        await roleApi.deleteById(id)
        handleListPage()
        noticeSuccess('删除成功')
      }
      catch (error) {
        console.log(error)
        noticeError('删除失败，请刷新重试')
        handleListPage()
      }
    })
    .catch(() => {
      msgError('已取消')
    })
}

/** 批量删除 */
function handleBatchDelete() {
  if (!ids.value.length) {
    msgInfo('请选择需要删除的数据')
    return
  }
  msgBox('您确认需要进行批量删除么？')
    .then(async () => {
      try {
        // console.log("ids",ids.value)
        await roleApi.batchDelete({ roleIds: ids.value })
        handleListPage()
        noticeSuccess('批量删除成功')
      }
      catch (error) {
        console.log(error)
        noticeError('批量删除失败，请刷新重试')
        handleListPage()
      }
    })
    .catch(() => {
      msgError('已取消')
    })
}

const drawerRef = ref()
const treeRef = ref()
const treeData = ref<any>([])

// 配置属性
const treeKeyProps = {
  id: 'id',
  label: 'description',
  children: 'children',
}
// 默认展开配置
const expandedKey = ref()
const id = ref()
/** 分配菜单 */
async function handleAssignMenu(row?: any) {
  title.value = '分配菜单'
  // 置空
  treeRef.value?.setCheckedKeys([], false)
  id.value = row?.id || ids.value[0]
  if (!id.value) {
    msgWarning('请选中需要分配菜单的数据')
    return
  }
  // 查询所有的菜单权限
  drawerRef.value.open()
  // console.log("角色ID",ids.value[0]);
  // 查询所有的菜单权限
  try {
    const res = await menuApi.list()
    treeData.value = generateTreeRoutesForEdit(res)

    console.log(treeData.value, 'ajdopajdopaw')
    // expandedKey.value = res.map((item) => item.id);
  }
  catch (error) {
    console.log(error)
    msgError('菜单资源加载失败')
  }

  try {
    const res = await menuApi.getRoles([id.value])
    // 通过key设置反选角色拥有的菜单权限(只能查询子节点，查询父节点将直接选中全部下的子节点)
    const childs = res.filter(item => item.parentId).map(item => item.id)
    if (res)
      treeRef.value?.setCheckedKeys(childs, false)
  }
  catch (error) {
    console.log(error)
    msgError('角色菜单资源加载失败')
  }
}

// 保存
async function handleMenuConfirm() {
  confirmLoading.value = true
  // 获取选中的keys
  const checkedKeys = treeRef.value?.getCheckedKeys(false)
  // console.log("选中",checkedKeys)
  // 获取半选的keys(即保存选中子节点的父节点[父节点下的子节点并没有选中完])
  const halfCheckKeys = treeRef.value?.getHalfCheckedKeys()
  // console.log("半选",halfCheckKeys)
  // 组合成最后的keys
  const finalKey = halfCheckKeys.concat(checkedKeys)
  // console.log("最终",finalKey)

  try {
    await menuApi.saveRoleMenu({
      roleId: id.value,
      routerIds: finalKey,
    })
    confirmLoading.value = false
    noticeSuccess('角色菜单保存成功')
    // 刷新页面菜单信息
    window.location.reload()
  }
  catch (error) {
    console.log(error)
    msgError('角色菜单保存失败')
  }
}

// 取消
function handleMenuCancel() {
  drawerRef.value.close()
}
</script>

<template>
  <div class="p-6px">
    <el-card class="rounded-md" shadow="never">
      <Table />

      <!-- 注意：如果后端数据返回的是字符串"0" OR "1",这里的active-value AND inactive-value不需要加冒号，会认为是字符串，否则：后端返回是0 AND 1数字，则需要添加冒号 -->

      <!-- 添加 OR 修改 -->
      <Dialog
        ref="dialogRef"
        :title="title"
        :loading="confirmLoading"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      >
        <el-form
          ref="formRef"
          :rules="rules"
          :model="form"
          label-width="80px"
          status-icon
        >
          <el-row>
            <el-col :xs="{ span: 24 }" :sm="{ span: 12 }">
              <el-form-item label="角色名称" prop="name">
                <el-input
                  v-model="form.name"
                  placeholder="请输入角色名称"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" class="p-l-10px">
              <el-form-item label="角色编号" prop="code">
                <el-input
                  v-model="form.code"
                  placeholder="请输入角色编号"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :xs="{ span: 24 }" :sm="{ span: 12 }">
              <el-form-item label="角色状态" prop="isEnabled">
                <el-select
                  v-model="form.isEnabled"
                  placeholder="请选择角色状态"
                  style="width: 260px"
                  clearable
                >
                  <el-option label="启用" :value="true" />
                  <el-option label="停用" :value="false" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" class="p-l-10px">
              <el-form-item label="角色排序" prop="sort">
                <el-input-number
                  v-model="form.sort"
                  style="width: 260px"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :xs="{ span: 24 }" :sm="{ span: 24 }">
              <el-form-item label="角色备注" prop="remark">
                <el-input
                  v-model="form.remark"
                  :rows="5"
                  type="textarea"
                  placeholder="请输入角色备注"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        {{ form }}
      </Dialog>

      <!-- 分配菜单 -->
      <Drawer
        ref="drawerRef"
        :title="title"
        size="360"
        :loading="confirmLoading"
        cancel-text="关闭"
        @confirm="handleMenuConfirm"
        @cancel="handleMenuCancel"
      >
        <el-tree
          ref="treeRef"
          :data="treeData"
          show-checkbox
          :default-expand-all="false"
          :default-expanded-keys="expandedKey"
          node-key="id"
          highlight-current
          :props="treeKeyProps"
        />
      </Drawer>
    </el-card>
  </div>
</template>
