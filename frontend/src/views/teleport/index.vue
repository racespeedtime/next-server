<script setup lang="tsx">
import { ElMessage, ElSwitch } from 'element-plus'
import { debounce } from 'lodash-es'
import { teleportApi } from '@/api'
import { useTable } from '@/composables/table/useTable'
import { commonYesOrNoOptions } from '@/constants/common'
import UserSelector from '@/components/Selector/UserSelector.vue'

function handleUpdate(row: any) {
  console.log(row)
  throw new Error('Function not implemented.')
}

function handleDelete(row: any) {
  console.log(row)
  throw new Error('Function not implemented.')
}

const toggleEnable = debounce(async (row) => {
  await teleportApi.update(row)
  ElMessage.success('修改成功')
}, 300)

const { Table, searchForm } = useTable({
  searchItems: [
    { label: '传送点名称', prop: 'name', type: 'input' },
    {
      label: '上传者',
      prop: 'userId',
      render() {
        return (
          <UserSelector
            v-model={searchForm.value.userId}
            placeholder="请选择上传者"
            style="width: 100%"
          />
        )
      },
    },
    { label: '内部空间Id', prop: 'interiorId', type: 'input' },
    {
      label: '是否为系统级',
      prop: 'isSystem',
      type: 'select',
      options: commonYesOrNoOptions,
    },
    {
      label: '是否启用',
      prop: 'isEnabled',
      type: 'select',
      options: commonYesOrNoOptions,
    },
    {
      label: '创建时间',
      prop: 'createdAt',
      type: 'datePicker',
      mapFields: ['createdAtStart', 'createdAtEnd'],
      props: {
        type: 'daterange',
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
      },
    },
  ],
  columns: [
    {
      label: 'id',
      prop: 'id',
      minWidth: '120px',
      align: 'center',
      fixed: 'left',

    },
    {
      label: '传送点名称',
      prop: 'name',
      minWidth: '120px',
      align: 'center',
      fixed: 'left',
    },
    {
      label: '描述',
      prop: 'description',
      minWidth: '200px',
      align: 'center',
    },
    {
      label: '上传者',
      prop: 'user.username',
      minWidth: '180px',
      align: 'center',
    },
    {
      label: 'x',
      prop: 'x',
      minWidth: '200px',
      align: 'center',
    },
    {
      label: 'y',
      prop: 'y',
      minWidth: '200px',
      align: 'center',
    },
    {
      label: 'z',
      prop: 'z',
      minWidth: '200px',
      align: 'center',
    },
    {
      label: '角度',
      prop: 'angle',
      minWidth: '200px',
      align: 'center',
    },
    {
      label: '内部空间Id',
      prop: 'interiorId',
      minWidth: '200px',
      align: 'center',
    },
    {
      label: '是否启用',
      prop: 'isEnabled',
      minWidth: '200px',
      align: 'center',
      render({ row }) {
        return <ElSwitch v-model={row.isEnabled} onChange={() => toggleEnable(row)} />
      },
    },
    {
      label: '是否为系统级',
      prop: 'isSystem',
      minWidth: '200px',
      align: 'center',
      render({ row }) {
        return <ElSwitch v-model={row.isSystem} onChange={() => toggleEnable(row)} />
      },
    },
    {
      label: '创建时间',
      prop: 'createdAt',
      minWidth: '180px',
      align: 'center',
    },
    {
      label: '更新时间',
      prop: 'updatedAt',
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
          </>
        )
      },
    },
  ],
  request: teleportApi.findAll,
})
</script>

<template>
  <div class="p-6px">
    <el-card class="rounded-md" shadow="never">
      <Table />
    </el-card>
  </div>
</template>
