<template>
  <div class="setting">
    <el-button size="small" circle icon="Refresh" @click="settingStore.refresh = !settingStore.refresh"></el-button>
    <el-button size="small" circle icon="FullScreen" @click="fullScreen"></el-button>
    <el-button size="small" circle icon="Setting"></el-button>
    <el-avatar icon="el-icon-user-solid" size="small" shape="circle" :src="(userStore.userInfo as User).avatar" fit="fill"
      class="avatar"></el-avatar>
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ (userStore.userInfo as User).username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import useLayoutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import type { User } from '@/api/user/type';

const settingStore = useLayoutSettingStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const fullScreen = () => {
  let full = document.fullscreenElement
  if (full) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}
const logout = () => {
  userStore.logout()
  router.replace({ path: '/login', query: { redirect: route.path } })
}

</script>

<style lang="scss" scoped>
.setting {
  display: flex;
  align-items: center;

  .avatar {
    margin: 0 15px;
  }
}
</style>
