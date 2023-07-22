<template>
  <el-card shadow="always" :body-style="{ padding: '20px' }">
    <el-button type="primary" icon="Plus">添加品牌</el-button>
    <el-table border stripe style="margin:20px 0;">
      <el-table-column label="序号" width="80px" align="center" />
      <el-table-column label="品牌名称" />
      <el-table-column label="序号" />
      <el-table-column label="序号" />
    </el-table>
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 10]" background
      layout=" prev, pager, next, jumper,->,sizes,total" :total="400" @size-change="" @current-change="" />

  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const pageNo = ref(1)
const pageSize = ref(3)
</script>

<style scoped></style>
