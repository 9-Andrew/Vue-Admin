<template>
  <div class="layout-container">
    <div class="layout-sidebar">
      <Logo></Logo>sidebar
    </div>
    <div class="layout-main">
      <div class="layout-tabbar">tabbar</div>
      <div class="layout-content">content
        <div style="height:5000px"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Logo from './logo/index.vue';
</script>

<style lang='scss' scoped>
.layout-container {
  display: flex;
  width: 100vw;
  height: 100vh;

  .layout-sidebar {
    width: $base-sidebar-width;
    background-color: $base-sidebar-background;
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