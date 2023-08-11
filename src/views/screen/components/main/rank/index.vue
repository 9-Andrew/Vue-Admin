<template>
  <div class="rank">
    <div class="top">
      <div class="title">热门景区排行</div>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import { ECharts, EChartsOption, init } from "echarts"

import { ranking1, ranking2, ranking3, ranking4 } from "@/views/screen/images/ranking-icon"
interface ChartProp {
  name: string;
  value: number;
  percentage: string;
  maxValue: number;
}

let charts = ref<any>(null)

onMounted(() => {
  let hotData = [
    {
      value: 79999,
      name: "洛邑古城",
      percentage: "80%",
      maxValue: 100000
    },
    {
      value: 59999,
      name: "老君山",
      percentage: "60%",
      maxValue: 100000
    },
    {
      value: 49999,
      name: "应天门",
      percentage: "50%",
      maxValue: 100000
    },
    {
      value: 39999,
      name: "丽景门",
      percentage: "40%",
      maxValue: 100000
    },
    {
      value: 29999,
      name: "明堂",
      percentage: "30%",
      maxValue: 100000
    }
  ]

  initChart({
    data: hotData,
    colors: ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"]
  })
})

const initChart = (data: any = {}): ECharts => {
  const charEle = charts.value
  const charEch: ECharts = init(charEle);
  const option: EChartsOption = {
    tooltip: {
      show: true,
    },
    grid: {
      top: "0",
      left: "30",
      right: "30",
      bottom: "0",
      containLabel: true
    },
    xAxis: {
      type: "value",
      axisLine: {
        show: false,
        lineStyle: {
          color: "white"
        }
      },
      nameGap: 1,
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false,
        fontSize: 16
      },
      boundaryGap: ["3%", "20%"],
      // splitNumber: 4,
      triggerEvent: false
    },
    yAxis: [
      {
        show: true,
        data: data.data.map((val: ChartProp) => val.name),
        inverse: true,
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: "#fff",
          formatter: function (value: any) {
            let str = value.length > 6 ? value.slice(0, 6) + "..." : value;
            let index = data.data.map((item: ChartProp) => item.name).indexOf(value) + 1;
            return ["{" + (index > 3 ? "lg" : "lg" + index) + "|NO." + index + "}", "{title|" + str + "}"].join(" ");
          },
          rich: {
            lg1: {
              width: 60,
              backgroundColor: {
                image: ranking1
              },
              color: "#fff",
              align: "center",
              height: 20,
              fontSize: 13
            },
            lg2: {
              width: 60,
              backgroundColor: {
                image: ranking2
              },
              color: "#fff",
              align: "center",

              height: 20,
              fontSize: 13
            },
            lg3: {
              width: 60,
              backgroundColor: {
                image: ranking3
              },
              color: "#fff",
              align: "center",
              height: 20,
              fontSize: 13
            },
            lg: {
              width: 60,
              backgroundColor: {
                image: ranking4
              },
              color: "#fff",
              align: "center",

              height: 20,
              fontSize: 13
            },
            title: {
              width: 60,
              fontSize: 13,
              align: "center",
              padding: [0, 10, 0, 15]
            }
          }
        },
        triggerEvent: false
      },
      {
        show: true,
        inverse: true,
        data: data.data,
        axisLabel: {
          fontSize: 14,
          color: "#fff",
          // align: "right",
          margin: 20,
          formatter: (value: any) => {
            return value >= 10000 ? (value / 10000).toFixed(2) + "w" : value;
          }
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        triggerEvent: false
      }
    ],
    series: [
      {
        // name: "条",
        name: "",
        type: "bar",
        yAxisIndex: 0,
        data: data.data,
        barWidth: 12,
        itemStyle: {
          borderRadius: 30,
          color: function (params) {
            let num = data.colors.length;
            return data.colors[params.dataIndex % num];
          }
        },
        label: {
          show: true,
          position: [12, 0],
          lineHeight: 14,
          color: "#fff",
          formatter: (params: any) => {
            return params.data.percentage;
          }
        }
      },
      {
        // name: "框",
        name: "",
        type: "bar",
        yAxisIndex: 1,
        data: data.data.map((val: ChartProp) => {
          if (!val.maxValue) {
            return 5;
          }
          return val.maxValue;
        }),
        barWidth: 18,
        itemStyle: {
          color: "none",
          borderColor: "#00c1de",
          borderWidth: 1,
          borderRadius: 15
        },
        silent: true
      }
    ]
  }
  charEch.setOption(option)
  return charEch
}
</script>

<style lang="scss" scoped>
.rank {
  flex-grow: 1;
  background: url('../../../images/dataScreen-main-rt.png') no-repeat;
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
      background: url('../../../images//dataScreen-title.png') no-krepeat bottom left;
    }
  }

  .charts {
    flex-grow: 1;
    margin-top: 45px;
  }
}
</style>
