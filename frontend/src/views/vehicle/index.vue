<script setup lang="tsx">
import { vehicleApi } from '@/api'
import { useTable } from '@/composables/table/useTable'

function handleUpdate(row: any) {
  throw new Error('Function not implemented.')
}

function handleDelete(row: any) {
  throw new Error('Function not implemented.')
}

const { Table, getList: handleListPage } = useTable({
  searchItems: [
    { label: '拥有者', prop: 'username', type: 'input' },
    { label: '模型Id', prop: 'modelId', type: 'number' },
    { label: '描述', prop: 'description', type: 'input' },
    {
      label: '是否上锁',
      prop: 'isLocked',
      type: 'select',
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
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
      label: '模型Id',
      prop: 'modelId',
      minWidth: '120px',
      align: 'center',
    },
    {
      label: '拥有者',
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
      label: 'angle',
      prop: '角度',
      minWidth: '200px',
      align: 'center',
    },
    {
      label: 'color',
      prop: '颜色',
      minWidth: '200px',
      align: 'center',
      render({ row }) {
        return (
          <span>
            {row.color1}
            /
            {row.color2}
          </span>
        )
      },
    },
    {
      label: '世界id',
      prop: 'worldId',
      minWidth: '120px',
      align: 'center',
    },
    {
      label: '内部空间id',
      prop: 'interiorId',
      minWidth: '120px',
      align: 'center',
    },
    {
      label: '是否上锁',
      prop: 'isLocked',
      minWidth: '120px',
      align: 'center',
      render({ row }) {
        return <span>{row.isLocked ? '是' : '否'}</span>
      },
    },
    {
      label: '价格',
      prop: 'price',
      minWidth: '150px',
      align: 'center',
    },
    {
      label: '车牌号',
      prop: 'plateNumber',
      minWidth: '150px',
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
  request: vehicleApi.findAll,
})
</script>

<template>
  <div class="p-6px">
    <el-card class="rounded-md" shadow="never">
      <Table />
    </el-card>
  </div>
</template>
