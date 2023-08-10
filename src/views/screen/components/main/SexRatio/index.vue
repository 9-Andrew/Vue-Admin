<template>
  <div class="age-ratio">
    <div class="top">
      <div class="title">年龄比例</div>
    </div>
    <div class="sex">
      <div class="man"><img src="../../../images/man.png" alt=""></div>
      <div class="woman"><img src="../../../images/woman.png" alt=""></div>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const charts = ref()

onMounted(() => {
  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    xAxis: {
      type: 'value',
      show: false,
      min: 0,
      max: 100
    },
    yAxis: {
      type: 'category',
      show: false
    },
    series: [
      {
        name: '男生',
        data: [43],
        seriesLayoutBy: 'column',
        type: 'bar',
        barWidth: '20',
        stack: 'total',
        itemStyle: {
          color: '#007afe',
          borderRadius: [20, 0, 0, 20]
        },
        z: 3,
        label: {
          show: true,
          offset: [-55, -30],
          color: '#fff',
          formatter: '{a0}{c0}%'
        }
      },
      {
        name: '女生',
        data: [56],
        seriesLayoutBy: 'column',
        type: 'bar',
        barWidth: '20',
        stack: 'total',
        itemStyle: {
          color: '#ff4b7a',
          borderRadius: [0, 20, 20, 0]
        },
        label: {
          show: true,
          offset: [80, -30],
          color: '#fff',
          formatter: '{a0}{c0}%'
        }
      }
    ],
    tooltip: {
      formatter: '{a0}占比{c0}%'
    },
    grid: {
      top: 0,
      bottom: 0,
      left: '50px',
      right: '50px'
    }
  })
})
</script>

<style lang="scss" scoped>
.age-ratio {
  flex-grow: 1;
  background: url('../../../images/dataScreen-main-lc.png') no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 30vh;
  margin: 20px 0;

  .top {
    display: flex;
    justify-content: space-between;

    .title {
      color: #fff;
      font-size: 22px;
      height: 40px;
      line-height: 36px;
      background: url('../../../images//dataScreen-title.png') no-repeat bottom left;
    }


  }

  .sex {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 38px 0 20px;

    .man {
      width: 111px;
      height: 116px;
      background: url('../../../images/man-bg.png') no-repeat;
      margin-right: 50px;
    }

    .woman {
      width: 111px;
      height: 116px;
      background: url('../../../images/woman-bg.png') no-repeat;
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .charts {
    flex-grow: 1;
  }
}
</style>