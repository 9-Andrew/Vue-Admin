<template>
  <div class="age-ratio">
    <div class="top">
      <div class="title">年龄比例</div>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'

const charts = ref()
const data = [
  { value: 1048, name: '10岁以下' },
  { value: 735, name: '10-18岁' },
  { value: 580, name: '18-30岁' },
  { value: 484, name: '30-60岁' },
  { value: 300, name: '60岁以上' },
]
let currentIndex = 0;
let timer = 0;

onMounted(() => {
  let myChart = echarts.init(charts.value)

  const option = {
    title: {
      text: '本月总量',
      left: 'center',
      top: 'center', 
      textStyle: {
        color: '#19E1E3',
        fontSize: 16,
      },
    },
    grid: { top: 0, bottom: 0, left: 0, right: 0 },
    tooltip: {
      trigger: "item",
      formatter: "{b} -  {d}%",
    },
    toolbox: {
      show: true,
    },
    legend: {
      show: true,
      orient: 'vertical',
      right: '0%',
      top: '12%',
      itemGap: 20,
      textStyle: {
        color: '#ffffff',
        fontSize: 12,
      },
      data: data.map(v => v.name)
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['30%', '66%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 10,
          borderWidth: 2,
          color: function (params: any) {
            const colorList = [
              {
                c1: ' #FF5745',
                c2: '#D05A4D',
              },
              {
                c1: ' #FA981E',
                c2: '#EC7322',
              },
              {
                c1: '#FFD145',
                c2: '#FFD145',
              },
              {
                c1: ' #238483',
                c2: '#55C27C',
              },
              {
                c1: ' #45EAFF',
                c2: '#40ADAC',
              },
              {
                c1: '#12B3F8',
                c2: '#7DE8FF',
              },
              {
                c1: ' #0176D3',
                c2: '#13B7FF',
              },
              {
                c1: '#015BD3',
                c2: '#138DFF',
              },
              {
                c1: ' #7c94e7',
                c2: '#1e2783',
              }
            ];
            return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: colorList[params.dataIndex].c1,
              },
              {
                offset: 1,
                color: colorList[params.dataIndex].c2,
              }
            ])
          },
        },

        label: {
          normal: {
            show: true,
            formatter: "{d}%",
            position: 'inside',
            color: "#fff"
          },
          emphasis: {
            show: true,
          },
        },

        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold',
            formatter: (params: any) => {
              return '{a|' + params.name + '}\n{b|' + params.value + '}'
            },
            rich: {
              a: {},
              b: {}
            }
          }
        },
        data: data
      }
    ]
  };


  function animate() {
    timer = setInterval(function () {
      var dataLen = option.series[0].data.length;
      // 取消之前高亮的图形
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: currentIndex,
      });
      currentIndex = (currentIndex + 1) % dataLen;
      // 高亮当前图形
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: currentIndex,
      });
    }, 1800);
  }
  animate();

  myChart.on("mouseover", function (e) {
    clearInterval(timer);
    // 取消之前高亮的图形
    myChart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
    });
    myChart.dispatchAction({
      type: 'highlight',
      dataIndex: e.dataIndex
    });
  });

  myChart.on("mouseout", function (e) {
    currentIndex = e.dataIndex;
    animate();
  });
  // 使用刚指定的配置项和数据显示图表
  myChart.setOption(option)
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
