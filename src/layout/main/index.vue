<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="!isRefresh" />
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import { watch, ref, nextTick } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'

const store = useLayoutSettingStore()
const isRefresh = ref(false)

watch(
  () => store.refresh,
  () => {
    isRefresh.value = true
    nextTick(() => {
      isRefresh.value = false
    })
  },
)
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
}
</style>
