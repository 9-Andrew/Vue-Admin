<template>
  <div class="layout-container">
    <div class="layout-sidebar" :class="{ fold: settingStore.fold }">
      <Logo></Logo>
      <el-scrollbar class="scroll-container">
        <el-menu
          :collapse="settingStore.fold"
          active-text-color="#fff"
          background-color="#001529"
          text-color="#959ea6"
          :default-active="route.path"
          router
        >
          <Menu :menuRoutes="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout-main">
      <div class="layout-tabbar">
        <Tabbar></Tabbar>
      </div>
      <el-scrollbar class="layout-content" :always="true">
        <Main></Main>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import useUserStore from '@/store/modules/user'
import useLayoutSettingStore from '@/store/modules/setting'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const settingStore = useLayoutSettingStore()
const route = useRoute()
</script>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  width: 100vw;
  height: 100vh;

  .layout-sidebar {
    width: $base-sidebar-width;
    background-color: $base-sidebar-background;
    transition: width 0.3s;

    .scroll-container {
      height: calc(100vh - $base-logo-height);

      .el-menu {
        border-right: none;
      }
    }

    &.fold {
      width: $min-sidebar-width;
    }
  }

  .layout-main {
    flex-grow: 1;

    .layout-tabbar {
      height: $base-tabbar-height;
    }

    .layout-content {
      background-color: #bfa;
      height: calc(100vh - $base-tabbar-height);
      padding: 20px;
      overflow: auto;
    }
  }
}
</style>
