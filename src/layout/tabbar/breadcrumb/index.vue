<template>
  <div class="breadcrumb">
    <el-icon @click="store.changeFold()">
     <component :is="store.fold?'Expand':'Fold'"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight" style="margin-left: 20px">
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import useLayoutSettingStore from '@/store/modules/setting';
const store = useLayoutSettingStore()
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
}
</style>