<script setup lang="tsx" name="MenuPage">
import { ElTag } from 'element-plus'
import MenuForm from './components/MenuForm.vue'
import {
  msgBox,
  msgError,
  msgWarning,
  noticeError,
  noticeSuccess,
} from '@/utils/msgNotice'

import { menuApi } from '@/api'

import { routeTypeOptions } from '@/constants/system'
import { useTable } from '@/composables/table/useTable'
import { generateTreeRoutesForEdit } from '@/utils/route'
import IconRender from '@/components/IconRender/IconRender.vue'

/** 添加 AND 修改弹出框 */
const dialogRef = ref()
// 标题
const title = ref('菜单管理')

// 重新渲染表格状态
const refreshTreeTable = ref(true)
// 是否展开
const isExpandAll = ref(true)

// 展开数据
const expandKey = ref()

const ids = ref([]) // 选中数组
const single = ref<boolean>(true) // 非单个禁用
const multiple = ref<boolean>(true) // 非多个禁用

const { Table, getList: handleTreeList } = useTable(
  computed(() => {
    return {
      pagination: false,
      searchItems: [
        { type: 'input', label: '菜单名称', prop: 'description' },
        { type: 'input', label: '权限标识', prop: 'button' },
      ],
      tableProps: {
        'defaultExpandAll': isExpandAll.value,
        'expandRowKeys': isExpandAll.value ? expandKey.value : [],
        'rowKey': 'id',
        'treeProps': { children: 'children', hasChildren: 'hasChildren' },
        'onSelection-change': handleSelectionChange,
      },
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
                  type="info"
                  icon="Sort"
                  plain
                  onClick={toggleExpandAll}
                >
                  展开/折叠
                </el-button>
              </el-col>
            </el-row>
          )
        },
      },
      columns: [
        {
          type: 'selection',
          width: 55,
          align: 'center',
        },
        {
          label: '序号',
          prop: 'id',
          minWidth: 200,
          align: 'center',
        },
        {
          label: '菜单名称',
          prop: 'description',
          width: 160,
          align: 'left',
        },
        {
          label: '菜单类型',
          prop: 'type',
          width: 100,
          align: 'center',
          render(scope) {
            const typeOption = routeTypeOptions.find((item) => {
              return item.value === scope.row.type
            })
            if (!typeOption)
              return <>未知</>
            return <ElTag type={typeOption.type}>{typeOption.label}</ElTag>
          },
        },
        {
          label: '图标',
          prop: 'icon',
          width: 80,
          align: 'center',
          render(scope) {
            return (
              <IconRender icon={scope.row.icon} size={20} local={scope.row.localIcon} />
            )
          },
        },
        {
          label: '路由名称',
          prop: 'name',
          width: 160,
          align: 'left',
        },
        {
          label: '路由地址',
          prop: 'path',
          width: 120,
          align: 'center',
        },
        {
          label: '页面路径',
          prop: 'component',
          width: 220,
          align: 'center',
        },
        {
          label: '权限标识',
          prop: 'button',
          width: 220,
          align: 'center',
        },
        {
          label: '外链路径',
          prop: 'link',
          width: 220,
          align: 'center',
        },
        {
          label: '是否显示',
          prop: 'show',
          width: 100,
          align: 'center',
          render(scope) {
            return (
              <el-tag type={scope.row.show === false ? 'danger' : 'warning'}>
                {scope.row.show === false ? '隐藏' : '显示'}
              </el-tag>
            )
          },
        },
        {
          label: '顺序',
          prop: 'sort',
          width: 90,
          align: 'center',
        },
        {
          label: '操作',
          fixed: 'right',
          width: '120px',
          render(row) {
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
              </>
            )
          },
        },
      ],
      async request(req) {
        const res = await menuApi.list(req)
        handleExpandKey(res)
        return generateTreeRoutesForEdit(res)
      },
    }
  }),
)

/** 展开节点 */
function handleExpandKey(data: any) {
  /* 展开节点开始 */
  if (data !== null && data.length) {
    expandKey.value = []
    const resultList: string[] = []
    data.forEach((obj: any) => {
      if (!obj.parentId)
        resultList.push(obj.id)

      if (obj.parentId) {
        resultList.push(obj.id)
        resultList.push(obj.parentId)
      }
    })
    // 过滤数据
    const uniqueArray = [...new Set(resultList)]
    console.log('展开节点', uniqueArray)
    expandKey.value = uniqueArray
  }
  else {
    expandKey.value = []
  }
}

/** 是否多选 */
function handleSelectionChange(selection: any) {
  // console.log(selection);
  ids.value = selection.map((item: any) => item.id)
  single.value = selection.length !== 1 // 单选
  multiple.value = !selection.length // 多选
}

/** 展开/折叠 */
function toggleExpandAll() {
  refreshTreeTable.value = false
  isExpandAll.value = !isExpandAll.value
  nextTick(() => {
    refreshTreeTable.value = true
  })
}

// form表单
const form = ref({} as any)

/** 添加 */
function handleAdd() {
  // 重置表单
  resetForm()
  title.value = '菜单添加'
  dialogRef.value.open()
}

/** 回显数据 */
async function handleEcho(id: any) {
  if (id == null || id === '') {
    msgWarning('请选择需要修改的数据')
    return
  }
  try {
    const res = await menuApi.getById(id)
    console.log('菜单回显数据', res)
    if (res.parentId === null)
      res.parentId = '0'
    form.value = { ...res, isLink: !!res.link }
  }
  catch (error) {
    console.log(error)
    noticeError('数据获取失败，请刷新重试')
  }
}

/** 修改 */
async function handleUpdate({ row }) {
  // 重置表单
  resetForm()
  // 标题
  title.value = '菜单修改'

  console.log(row, 'wadm;lawjdpl;a')

  const id = row ? row.id : ids.value[0]
  if (!id)
    msgError('请选择需要修改的数据')

  // 回显数据
  handleEcho(id)
  dialogRef.value.open()
}

/** 清空表单数据 */
function resetForm() {
  form.value = {
    parentId: '0',
    type: 0,
    icon: '',
    description: '',
    name: '',
    path: '',
    component: '',
    show: true,
    keepAlive: false,
    alwaysShow: false,
    button: '',
    affixTag: false,
    sort: 0,
    isLink: false,
    breadCrumb: true,
    redirect: null,
  }
}

const menuFormRef = ref<InstanceType<typeof MenuForm> | null>(null)

// 确定按钮是否显示loading
const confirmLoading = ref(false)
/** 确定  */
function handleConfirm() {
  if (!menuFormRef.value)
    return
  confirmLoading.value = true
  const { value } = menuFormRef.value;
  (menuFormRef.value).validate(async (valid) => {
    if (!valid) {
      msgError('验证失败，请检查填写内容')
      confirmLoading.value = false
      return
    }

    const parentId = value.parentId === '0' ? null : value.parentId

    if (value.id) {
      try {
        await menuApi.update(value.id, { ...value, parentId })
        noticeSuccess('修改成功')
        confirmLoading.value = false
        dialogRef.value.quickClose()
        resetForm()
        handleTreeList()
      }
      catch (error) {
        console.log(error)
        noticeError('修改失败，请刷新重试')
      }
      confirmLoading.value = false
      return
    }
    try {
      // if (value.type == "3") value.show = "0"; // 按钮类型时，默认隐藏
      await menuApi.add({ ...value, parentId })
      noticeSuccess('添加成功')

      dialogRef.value.quickClose()
      resetForm()
      handleTreeList()
    }
    catch {
      noticeError('添加失败，请刷新重试')
    }
    confirmLoading.value = false
  })
}

/** 取消 */
function handleCancel() {
  dialogRef.value.close()
}

/** 删除 */
function handleDelete({ row }: any) {
  const id = row.id
  if (!id)
    msgWarning('请选中需要删除的数据')

  msgBox(`您确认需要删除菜单名称[${row.description}]么？`)
    .then(async () => {
      try {
        await menuApi.deleteById(id)
        noticeSuccess('删除成功')
        handleTreeList()
      }
      catch (error) {
        console.log(error)
      }
    })
    .catch(() => {
      msgError('已取消')
    })
}
</script>

<template>
  <div class="p-6px">
    <el-card class="rounded-md" shadow="never">
      <Table v-if="refreshTreeTable" />
      <!-- 添加 OR 修改 -->
      <Dialog
        ref="dialogRef"
        :title="title"
        :loading="confirmLoading"
        :height="500"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      >
        <MenuForm ref="menuFormRef" :model="form" />
      </Dialog>
    </el-card>
  </div>
</template>
