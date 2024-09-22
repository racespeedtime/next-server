<script setup lang="tsx">
import { attireApi } from '@/api'
import { useTable } from '@/composables/table/useTable'

function handleUpdate(row: any) {
  console.log(row)
  throw new Error('Function not implemented.')
}

function handleDelete(row: any) {
  console.log(row)
  throw new Error('Function not implemented.')
}

const { Table } = useTable({
  searchItems: [
    { label: '装扮名', prop: 'name', type: 'input' },
    {
      type: 'select',
      prop: 'type',
      label: '类型',
      options: [

      ],
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
      label: '装扮名',
      prop: 'name',
      minWidth: '180px',
      align: 'center',
      fixed: 'left',
    },
    {
      label: '模型Id',
      prop: 'modelId',
      minWidth: '120px',
      align: 'center',
    },
    {
      label: '价格',
      prop: 'price',
      minWidth: '120px',
      align: 'center',
    },
    {
      label: '骨骼ID',
      prop: 'boneId',
      align: 'center',
    },
    {
      label: 'x',
      prop: 'x',
      align: 'center',
    },
    {
      label: 'y',
      prop: 'y',
      align: 'center',
    },
    {
      label: 'z',
      prop: 'z',
      align: 'center',
    },
    {
      label: 'rX',
      prop: 'rX',
      align: 'center',
    },
    {
      label: 'rY',
      prop: 'rY',
      align: 'center',
    },
    {
      label: 'rZ',
      prop: 'rZ',
      align: 'center',
    },
    {
      label: 'sX',
      prop: 'sX',
      align: 'center',
    },
    {
      label: 'sY',
      prop: 'sY',
      align: 'center',
    },
    {
      label: 'sZ',
      prop: 'sZ',
      align: 'center',
    },
    {
      label: '类型',
      prop: 'type',
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
  request: attireApi.findAll,
})
</script>

<template>
  <div class="p-6px">
    <el-card class="rounded-md" shadow="never">
      <Table />
    </el-card>
  </div>
</template>
