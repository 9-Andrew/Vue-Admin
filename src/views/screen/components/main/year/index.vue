<template>
  <div class="year">
    <div class="top">
      <div class="title">年度游客量对比</div>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, inject } from 'vue'
import * as echarts from 'echarts'
import moment from 'moment'

const charts = ref()
const randomArr: any = inject('randomArr')

onMounted(() => {
  let year = moment().format('YYYY年')
  let lastYear = moment().add(-1, 'year').format('YYYY年')

  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    color: ['#5090FF', '#01B3E4'],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,.6)',
      borderColor: 'rgba(147, 235, 248, .8)',
      textStyle: {
        color: '#FFF',
      },
    },
    grid: {
      left: '2%',
      right: '5%',
      bottom: '5%',
      top: '60px',
      containLabel: true,
    },
    legend: {
      show: true,
      icon: 'rect',
      orient: 'horizontal',
      left: 'right',
      itemWidth: 12,
      itemHeight: 12,
      formatter: ['{a|{name}}'].join('\n'),
      textStyle: {
        fontSize: 12,
        color: '#6A93B9',
        height: 8,
        rich: {
          a: {
            verticalAlign: 'bottom',
          },
        },
      },
      data: [year, lastYear],
    },
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#BDD8FB',
          fontSize: 12,
        },
      },
      axisLabel: {
        // interval:0,
        color: '#BDD8FB',
        fontSize: 12,
      },
      axisTick: {
        show: false,
      },
      data: new Array(12).fill(null).map((_, index) => index + 1),
    },
    yAxis: {
      type: 'value',
      min: 0,
      minInterval: 1,
      nameTextStyle: {
        fontSize: 12,
        color: '#BDD8FB',
        align: 'center',
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.15)',
          // type: 'dashed', // dotted 虚线
        },
      },
      splitArea: { show: false },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 12,
        fontFamily: 'Bebas',
        color: '#BDD8FB',
      },
    },
    series: [
      {
        type: 'line',
        // symbol: "none",
        // showSymbol: false,
        smooth: true, // 是否曲线
        name: year, // 图例对应类别
        data: randomArr(12, 10000, 5000), // 纵坐标数据
        areaStyle: {
          // 区域颜色
          // color: new graphic.LinearGradient(0, 0, 0, 1, [
          // 	{
          // 		offset: 0,
          // 		color: "#5090FF",
          // 	},
          // 	{
          // 		offset: 1,
          // 		color: "#1057E5",
          // 	},
          // ]),
          color: {
            type: 'linear',
            x: 0, //右
            y: 0, //下
            x2: 0, //左
            y2: 1, //上
            colorStops: [
              {
                offset: 0.1,
                color: '#5090FF', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#1057E500', // 100% 处的颜色
              },
            ],
          },
        },
      },
      {
        type: 'line',
        smooth: true,
        name: lastYear,
        data: randomArr(12, 10000, 5000),
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, //右
            y: 0, //下
            x2: 0, //左
            y2: 1, //上
            colorStops: [
              {
                offset: 0.1,
                color: '#01B3E4', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#86DCF300', // 100% 处的颜色
              },
            ],
          },
        },
      },
    ],
  })
})
</script>

<style lang="scss" scoped>
.year {
  flex-grow: 1;
  background: url('../../../images/dataScreen-main-rc.png') no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px 0;
  height: 30vh;

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
  }
}
</style>
