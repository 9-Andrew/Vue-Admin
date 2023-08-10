<template>
  <div class="tourist-ratio">
    <div class="top">
      <div class="title">实时游客统计</div>
      <div class="info">
        可以预约总量
        <span>18738</span>
        人
      </div>
    </div>
    <ul class="number">
      <li v-for="(item, index) in people" :key="index">{{ item }}</li>
    </ul>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'

const people = ref('132412人')
const charts = ref()

onMounted(() => {
  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    title: [
      {
        text: '预约量' + 60 + '%',
        left: 'center',
        top: '33%',
        textStyle: {
          color: '#fff',
          fontSize:'15px'
        },
      },
    ],
    grid: {
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
    },
    polar: {
      radius: ['85%', '95%'],
      center: ['50%', '50%'],
    },
    angleAxis: {
      max: 120,
      clockwise: false,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      startAngle: 188,
    },
    radiusAxis: {
      type: 'category',
      show: true,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        type: 'liquidFill',
        radius: '80%',
        center: ['50%', '50%'],
        data: [0.4, 0.4, 0.4], // data个数代表波浪数
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#35FAB6', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(40, 209, 247,0.3)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        outline: {
          borderDistance: 0,
          itemStyle: {
            borderWidth: 2,
            borderColor: '#31d8d5',
            shadowBlur: 20,
            shadowColor: '#50c1a7',
          },
        },
        label: {
          show: false,
        },
        backgroundStyle: {
          borderWidth: 1,
          // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
          color: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              {
                offset: 0,
                color: '#0D2648', // 0% 处的颜色
              },
              {
                offset: 0.8,
                color: '#0D2648', // 100% 处的颜色
              },
              {
                offset: 1,
                color: '#228E7D', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  })
})
</script>

<style lang="scss" scoped>
.tourist-ratio {
  flex-grow: 1;
  background: url('../../../images/dataScreen-main-lt.png') no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 30vh;

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

    .info {
      height: 40px;
      font: 14px/5 'microsoft-微软雅黑';
      color: #fff;
      margin-right: 5px;

      span {
        color: orange;
      }
    }
  }

  .number {
    display: flex;
    justify-content: center;
    height: 58px;
    margin: 38px 0 20px;

    li {
      flex-grow: 1;
      max-width: 54px;
      background: url('../../../images/total.png') no-repeat;
      background-size: cover;
      line-height: 58px;
      text-align: center;
      font-size: 32px;
    }
  }

  .charts {
    flex-grow: 1;
  }
}
</style>
