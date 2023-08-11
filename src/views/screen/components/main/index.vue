<template>
  <el-row class="header">
    <el-col :span="6" :offset="0" class="left">
      <TouristRatio></TouristRatio>
      <SextRatio></SextRatio>
      <AgeRatio></AgeRatio>
    </el-col>
    <el-col :span="12" :offset="0" class="center">
      <Map></Map>
      <Line></Line>
    </el-col>
    <el-col :span="6" :offset="0" class="right">
      <Rank></Rank>
      <Year></Year>
      <Count></Count>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { provide, onBeforeMount } from 'vue'
import TouristRatio from './TouristRatio/index.vue'
import SextRatio from './SexRatio/index.vue'
import AgeRatio from './AgeRatio/index.vue'
import Map from './map/index.vue'
import Line from './line/index.vue'
import Rank from './rank/index.vue'
import Year from './year/index.vue'
import Count from './count/index.vue'

const randomArr = (length: number = 1, max: number = 100, base: number = 0) => {
  return new Array(length)
    .fill(null)
    .map((_) => +Math.round(Math.random() * max + base))
}
onBeforeMount(() => {
  provide('randomArr', randomArr)
})
</script>

<style lang="scss" scoped>
.header {
  color: #29fcff;
  font-family: YouSheBiaoTiHei, sans-serif;
  flex-grow: 1;

  .left,
  .center,
  .right {
    display: flex;
    flex-direction: column;
  }

  .center {
    padding: 0 20px;
  }
}
</style>
