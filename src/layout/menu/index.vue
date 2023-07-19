<template>
  <template v-for="mr in routes" :key="mr.path">
    <el-menu-item v-if="!mr.children" :index="mr.path">
      <el-icon>
        <component :is="mr.meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ mr.meta.title }}</span>
      </template>
    </el-menu-item>
    <el-menu-item
      v-else-if="mr.children.length == 1"
      :index="mr.children[0].path"
    >
      <el-icon>
        <component :is="mr.children[0].meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ mr.children[0].meta.title }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu v-else :index="mr.path">
      <template #title>
        <el-icon>
          <component :is="mr.meta.icon"></component>
        </el-icon>
        <span>{{ mr.meta.title }}</span>
      </template>
      <Menu :menuRoutes="mr.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script lang="ts" setup>
import Menu from './index.vue'
const props = defineProps(['menuRoutes'])
const routes = props.menuRoutes.filter((item: any) => !item?.meta?.hidden)
</script>

<style scoped></style>
