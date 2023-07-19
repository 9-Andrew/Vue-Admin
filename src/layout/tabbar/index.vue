<template>
  <div class="tabbar">
    <Breadcrumb></Breadcrumb>
    <Setting></Setting>
  </div>
</template>

<script lang="ts" setup>
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<style lang="scss" scoped>
.tabbar {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
}
</style>
