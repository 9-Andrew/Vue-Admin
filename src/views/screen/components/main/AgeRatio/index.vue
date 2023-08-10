<template>
  <div class="age-ratio">
    <div class="top">
      <div class="title">年龄比例</div>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import 'echarts-liquidfill'

const charts = ref()

onMounted(() => {
  let myCharts = echarts.init(charts.value)

  // 模拟的数据，你可以根据实际情况进行替换
  var data = [
    { name: '男', value: 60 },
    { name: '女', value: 40 }
  ];
// 配置项
var option = {
  title: {
    text: '男女占比柱状图'
  },
  tooltip: {},
  yAxis: {
    type: 'category',
    data: data.map(item => item.name),
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    }
  },
  xAxis: {
    type: 'value',
    max: 100,
    axisTick: {
      show: false
    }
  },
  series: [
    {
      name: '男',
      type: 'bar',
      data: [data[0].value],
      stack: 'total',
      barCategoryGap: '-100%', // 设置为负值，去掉柱子之间的空隙
      barWidth: '100%', // 设置柱子宽度为类别宽度，以填满整个类别宽度
      itemStyle: {
        color: '#3498db',
        borderRadius: [10, 10, 10, 10] // 设置四个角的圆角
      },
      label: {
        show: true,
        position: 'insideLeft',
        formatter: '{c}%'
      }
    },
    {
      name: '女',
      type: 'bar',
      data: [data[1].value],
      stack: 'total',
      barWidth: '100%', // 设置柱子宽度为类别宽度，以填满整个类别宽度
      itemStyle: {
        color: '#e74c3c',
        borderRadius: [10, 10, 10, 10] // 设置四个角的圆角
      },
      label: {
        show: true,
        position: 'insideRight',
        formatter: '{c}%'
      }
    }
  ]
};
// 使用刚指定的配置项和数据显示图表
myCharts.setOption(option);


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

  .charts {
    flex-grow: 1;
  }
}
</style>