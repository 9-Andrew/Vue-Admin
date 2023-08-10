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
    <el-col :span="6" :offset="0" class="right"></el-col>
  </el-row>
</template>

<script lang="ts" setup>
import TouristRatio from './TouristRatio/index.vue'
import SextRatio from './SexRatio/index.vue'
import AgeRatio from './AgeRatio/index.vue'
import Map from './map/index.vue'
import Line from './line/index.vue'
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
