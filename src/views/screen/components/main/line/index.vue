<template>
  <div class="line">
    <div class="top">
      <div class="title">未来三十天游客数量趋势图</div>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, inject } from 'vue'
import * as echarts from 'echarts'
import moment from 'moment'

const charts = ref()
let future: any = []
const randomArr: any = inject('randomArr')

onMounted(() => {
  let nowDate = moment()
  for (let i = 1; i < 31; i++) {
    const futureDate = moment(nowDate).add(i, 'days')
    future.push(futureDate.format('MM-DD'))
  }

  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: future,
        boundaryGap: true,
        axisTick: {
          show: false, // 不显示坐标轴刻度线
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: 'rgba(230, 247, 255, 0.50)',
          fontSize: 14,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        //y右侧文字
        axisLabel: {
          color: 'rgba(230, 247, 255, 0.50)',
          fontSize: 16,
        },
        // y轴的分割线
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(230, 247, 255, 0.20)',
          },
        },
      },
    ],
    series: [
      {
        name: '预计游客数',
        type: 'line',
        smooth: true,
        symbol: 'none', // 不显示连接点
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        lineStyle: {
          width: 3,
          shadowColor: '#1890FF',
          shadowBlur: 20,
        },
        areaStyle: {
          opacity: 1,
          //右下左上
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(24, 144, 255, .5)',
            },
            {
              offset: 0.3,
              color: 'rgba(24, 144, 255, 0.2)',
            },
            {
              offset: 1,
              color: 'rgba(24, 144, 255, 0)',
            },
          ]),
        },
        data: randomArr(30, 6000, 1500),
      },
    ],
  })
})
</script>

<style lang="scss" scoped>
.line {
  flex-grow: 1;
  background: url('../../../images/dataScreen-main-cb.png') no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .top {
    display: flex;
    justify-content: space-between;

    .title {
      color: #fff;
      font-size: 22px;
      height: 40px;
      line-height: 36px;
      background: url('../../../images//dataScreen-title.png') no-repeat bottom
        left;
    }
  }

  .charts {
    flex-grow: 1;
    height: 22vh;
  }
}
</style>
