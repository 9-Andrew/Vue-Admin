<template>
  <div class="setting">
    <el-button size="small" circle icon="Refresh"></el-button>
    <el-button size="small" circle icon="FullScreen"></el-button>
    <el-button size="small" circle icon="Setting"></el-button>
    <el-avatar
      icon="el-icon-user-solid"
      size="small"
      shape="circle"
      src="/avatar.jpg"
      fit="fill"
      class="avatar"
    ></el-avatar>
    <el-dropdown>
      <span class="el-dropdown-link">
        Admin
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.setting {
  display: flex;
  align-items: center;
  .avatar {
    margin: 0 15px;
  }
}
</style>
