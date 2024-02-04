<script setup lang="ts">
import Card from './components/Card.vue'
import LeftChart from './components/LeftChart.vue'
import RightChart from './components/RightChart.vue'
</script>

<template>
  <div class="p-6px">
    <el-card class="rounded-md dark:bg-black" shadow="hover">
      <div
        v-waterMarker="{ text: 'rst_admin', textColor: '#D9D9D9' }"
      >
        <div class="font-bold p-b-8px whitespace-nowrap">
          <span>rst_admin</span>
        </div>
        <div class="font-bold whitespace-nowrap">
          去码头整点薯条~
        </div>
      </div>
    </el-card>
    <Card />
    <el-row :gutter="20" class="m-t-5px">
      <el-col :span="12" :lg="12" :md="12" :sm="24" :xs="24">
        <el-card class="rounded-md dark:bg-black" shadow="hover">
          <LeftChart />
        </el-card>
      </el-col>
      <el-col :span="12" :lg="12" :md="12" :sm="24" :xs="24">
        <el-card class="rounded-md dark:bg-black" shadow="hover">
          <RightChart />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
