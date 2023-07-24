<template>
  <div>{{ store.userInfo.name }}</div>
</template>

<script lang="ts" setup>
import useUserStore from '@/store/modules/user'

const store = useUserStore()
</script>

<style scoped></style>
