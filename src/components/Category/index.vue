<template>
  <el-card shadow="always" :body-style="{ padding: '20px' }" style="margin:10px 0;">
    <el-form label-width="80px" :inline="true">
      <el-form-item label="一级分类">
        <el-select v-model="store.C1ID" @change="handler1">
          <el-option v-for="c1 in store.C1List" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="store.C2ID" @change="handler2">
          <el-option v-for="c2 in store.C2List" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="store.C3ID">
          <el-option v-for="c3 in store.C3List" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import useCategoryStore from '@/store/modules/category';

const store = useCategoryStore()
const handler1 = () => {
  store.C2ID = ''
  store.C3ID = ''
  store.C3List = []
  store.getC2()
}
const handler2 = () => {
  store.C3ID = ''
  store.getC3()
}
onMounted(() => {
  store.getC1()
})
</script>

<style scoped></style>