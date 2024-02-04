<script setup lang="ts">
import { CountTo } from 'vue3-count-to'

const cardList = reactive([
  {
    title1: '上月支付订单',
    unit: '月',
    value1: 6600,
    title2: '总订单数量',
    value2: 7000,
  },
  {
    title1: '上月退款订单',
    unit: '月',
    value1: 400,
    title2: '退款金额',
    value2: 8000,
  },
])
</script>

<template>
  <el-row :gutter="20" class="m-t-5px">
    <el-col
      v-for="(item, index) in cardList"
      :key="index + new Date().getTime()"
      :span="12"
      :lg="12"
      :md="12"
      :sm="12"
      :xs="24"
    >
      <el-card class="rounded-md dark:bg-black" shadow="hover">
        <div class="flex justify-between">
          <span class="text-sm">{{ item.title1 }}</span>
          <el-tag
            :type="
              index === 0
                ? ''
                : index === 1
                  ? 'success'
                  : index === 2
                    ? 'warning'
                    : 'danger'
            "
          >
            {{ item.unit }}
          </el-tag>
        </div>
        <div class="text-2xl">
          <CountTo :start-val="0" :end-val="item.value1" :duration="2000" />
        </div>
        <el-divider direction="horizontal" content-position="left" />
        <div class="flex justify-between">
          <span class="text-sm">{{ item.title2 }}</span>
          <span><CountTo :start-val="0" :end-val="item.value2" :duration="2000" /></span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
