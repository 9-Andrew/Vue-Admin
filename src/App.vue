<template>
  <div>
    app
    <el-button type="primary" size="default" :icon="Edit">默认按钮</el-button>

    <el-pagination
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000"
    ></el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { Edit } from '@element-plus/icons-vue'
</script>

<style lang="" scoped></style>
