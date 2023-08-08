<template>
  <div class="setting">
    <el-button size="small" circle icon="Refresh" @click="settingStore.refresh = !settingStore.refresh"></el-button>
    <el-button size="small" circle icon="FullScreen" @click="fullScreen"></el-button>
    <el-popover placement="bottom" title="主题设置" width="200" trigger="click">
      <el-form>
        <el-form-item label="主题颜色">
          <el-color-picker v-model="color" show-alpha size="large" :predefine="predefineColors" @change="setColor" />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch v-model="isDark" active-icon="Sunny" inactive-icon="Moon" inline-prompt size="large"
            @change="modeChange">
          </el-switch>
        </el-form-item>
      </el-form>
      <template #reference> <el-button size="small" circle icon="Setting"></el-button></template>
    </el-popover>
    <el-avatar icon="el-icon-user-solid" size="small" shape="circle" :src="userStore.userInfo.avatar" fit="fill"
      class="avatar"></el-avatar>
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.userInfo.name }}
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
import { ref } from 'vue'

const settingStore = useLayoutSettingStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const color = ref('rgba(64, 158, 255, 1)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const isDark = ref(false)

const fullScreen = () => {
  let full = document.fullscreenElement
  if (full) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}
const logout = async () => {
  await userStore.logout()
  router.replace({ path: '/login', query: { redirect: route.path } })
}
const modeChange = (val: any) => {
  let html = document.documentElement
  if (val) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}
const setColor = () => {
  document.documentElement.style.setProperty('--el-color-primary', color.value)
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
