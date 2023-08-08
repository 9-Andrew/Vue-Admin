<template>
  <el-card :body-style="{ padding: '20px' }">
    <el-avatar icon="el-icon-user-solid" size="large" shape="circle" :src="store.userInfo.avatar" fit="fill"></el-avatar>
    <h4> {{ getTime() }}好！{{ store.userInfo.name }}</h4>
  </el-card>
  <div class="bg"><Svg-Icon name="welcome" width="500px" height="400px"></Svg-Icon></div>
</template>

<script lang="ts" setup>
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time';

const store = useUserStore()
</script>

<style lang="scss" scoped>
:deep(.el-card__body) {
  display: flex;
  align-items: center;

  h4 {
    font-weight: bold;
    font-size: 22px;
    margin-left: 30px;
  }
}

.bg {
  display: flex;
  justify-content: center;
}
</style>
