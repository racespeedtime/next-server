<script setup lang="ts" name="500">
const router = useRouter()
</script>

<template>
  <div class="not-container">
    <img src="@/assets/images/error/500.png" class="not-img" alt="500">
    <div class="not-detail">
      <h2>500</h2>
      <h4>抱歉，服务器异常~🤦‍♂️🤦‍♀️</h4>
      <el-button type="primary" @click="router.back">
        返回上一页
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./index.scss";
</style>
