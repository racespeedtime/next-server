<script setup lang="tsx">
import { houseApi } from '@/api'
import { useTable } from '@/composables/table/useTable'
import UserSelector from '@/components/Selector/UserSelector.vue'

function handleUpdate(row: any) {
  throw new Error('Function not implemented.')
}

function handleDelete(row: any) {
  throw new Error('Function not implemented.')
}

const houseTypeOptions = [
  { label: '房屋', value: 0 },
  { label: '赛道', value: 1 },
  { label: '死斗', value: 2 },
  { label: '传送点', value: 3 },
]

const { Table, getList: handleListPage, searchForm } = useTable({
  searchItems: [
    { label: '房屋名称', prop: 'name', type: 'input' },
    {
      label: '类型',
      prop: 'relation',
      type: 'select',
      options: houseTypeOptions,
    },
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
      label: '房屋名称',
      prop: 'name',
      minWidth: '120px',
      align: 'center',
    },
    {
      label: '上传者',
      prop: 'user.username',
      minWidth: '180px',
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
      label: '类型',
      prop: 'relation',
      minWidth: '200px',
      align: 'center',
      render({ row }) {
        return <span>{houseTypeOptions.find(item => item.value === row.relation)?.label}</span>
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
  request: houseApi.findAll,
})
</script>

<template>
  <div class="p-6px">
    <el-card class="rounded-md" shadow="never">
      <Table />
    </el-card>
  </div>
</template>
