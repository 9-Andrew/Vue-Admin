<template>
  <el-row class="header">
    <el-col :span="6" :offset="0" class="left">
      <TouristRatio></TouristRatio>
      <SextRatio></SextRatio>
      <AgeRatio></AgeRatio>
    </el-col>
    <el-col :span="12" :offset="0" class="center">

    </el-col>
    <el-col :span="6" :offset="0" class="right">
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import TouristRatio from './TouristRatio/index.vue';
import SextRatio from './SexRatio/index.vue';
import AgeRatio from './AgeRatio/index.vue';
</script>

<style lang="scss" scoped>
.header {
  color: #29fcff;
  font-family: YouSheBiaoTiHei, sans-serif;
  flex-grow: 1;

  .left {
    display: flex;
    flex-direction: column;
  }
}
</style>