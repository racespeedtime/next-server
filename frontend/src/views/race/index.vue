<script setup lang="tsx">
import { raceApi } from '@/api'
import { useTable } from '@/composables/table/useTable'
import UserSelector from '@/components/Selector/UserSelector.vue'

function handleUpdate(row: any) {
  throw new Error('Function not implemented.')
}

function handleDelete(row: any) {
  throw new Error('Function not implemented.')
}

const { Table, getList: handleListPage, searchForm } = useTable({
  searchItems: [
    { label: '赛道名称', prop: 'name', type: 'input' },
    {
      label: '赛道作者',
      prop: 'userId',
      render() {
        return (
          <UserSelector
            v-model={searchForm.value.userId}
            placeholder="请选择赛道作者"
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
    },
    {
      label: '名称',
      prop: 'name',
      minWidth: '120px',
      align: 'center',
    },
    {
      label: '作者',
      prop: 'user.username',
      minWidth: '180px',
      align: 'center',
    },
    {
      label: '描述',
      prop: 'description',
      minWidth: '200px',
      align: 'center',
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
  request: raceApi.findAll,
})
</script>

<template>
  <div class="p-6px">
    <el-card class="rounded-md" shadow="never">
      <Table />
    </el-card>
  </div>
</template>
