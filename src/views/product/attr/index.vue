<template>
  <div>
    <Category></Category>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <el-button type="primary" icon="Plus" @click="" :disabled="!store.C3ID">添加属性</el-button>
      <el-table border stripe style="margin: 20px 0">
        <el-table-column label="序号" type="index" width="100px" align="center" />
        <el-table-column label="属性名称"></el-table-column>
        <el-table-column label="属性值名称" width="800px"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import useCategoryStore from '@/store/modules/category';
const store = useCategoryStore()
</script>

<style scoped></style>
