<template>
  <div class="breadcrumb">
    <el-icon @click="store.changeFold()">
      <component :is="store.fold ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight" style="margin-left: 20px">
      <el-breadcrumb-item v-for="(item, index) in route.matched" :key="index" v-show="item.meta.title" :to="item.path">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import useLayoutSettingStore from '@/store/modules/setting'
import { useRoute } from 'vue-router';

const store = useLayoutSettingStore()
const route = useRoute()
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
}
</style>
