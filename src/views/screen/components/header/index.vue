<template>
  <el-row class="header">
    <el-col :span="6" :offset="0" class="left">
      <div></div>
      <router-link to="/home" class="btn">首页</router-link>
    </el-col>
    <el-col :span="12" :offset="0" class="center">
      <h1 class="title">
        智慧旅游可视化大数据展示平台
      </h1>
    </el-col>
    <el-col :span="6" :offset="0" class="right">
      <div class="btn">统计报告</div>
      <div class="time">当前时间: {{ time }}</div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import moment from 'moment'

let time = ref()
let timer: any = null

onMounted(() => {
  timer = setInterval(() => {
    time.value = moment().format('YYYY年MM月DD HH:mm:ss')
  }, 1000)
})
onBeforeMount(() => {
  clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.header {
  color: #29fcff;
  font-family: YouSheBiaoTiHei, sans-serif;

  .left {
    background: url('../../images/dataScreen-header-left-bg.png') no-repeat;
    height: 42px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .btn {
      background: url('../../images/dataScreen-header-btn-bg-l.png') no-repeat;
      width: 135px;
      height: 100%;
      font-size: 20px;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      cursor: pointer;
      font-family: YouSheBiaoTiHei, sans-serif;
    }
  }

  .right {
    background: url('../../images/dataScreen-header-right-bg.png') no-repeat;
    height: 42px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .btn {
      background: url('../../images/dataScreen-header-btn-bg-r.png') no-repeat;
      width: 135px;
      height: 100%;
      font-size: 20px;
      text-align: center;
      line-height: 40px;
    }

    .time {
      font-size: 17px;
      line-height: 42px;
      width: 320px;
    }
  }

  .center {
    background: url('../../images//dataScreen-header-center-bg.png') no-repeat;
    background-size: cover;
    height: 74px;

    .title {
      font-size: 28px;
      line-height: 74px;
      text-align: center;
    }
  }
}
</style>