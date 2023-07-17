<template>
  <div class="layout-container">
    <div class="layout-sidebar">
      <Logo></Logo>
      <el-scrollbar class="scroll-container">
        <el-menu
          default-active="1"
          background-color="$base-sidebar-background"
          text-color="#959EA6"
          active-text-color="#fff"
          router
        >
          <Menu :menuRoutes="store.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout-main">
      <div class="layout-tabbar">tabbar</div>
      <el-scrollbar class="layout-content" :always="true">
        content
        <div style="height: 2000px"></div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import useUserStore from '@/store/modules/user'

let store = useUserStore()
</script>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  width: 100vw;
  height: 100vh;

  .layout-sidebar {
    width: $base-sidebar-width;
    background-color: $base-sidebar-background;

    .scroll-container {
      height: calc(100vh - $base-logo-height);

      .el-menu {
        border-right: none;
      }
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
