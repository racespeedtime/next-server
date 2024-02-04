<script setup lang="ts">
import type { EChartsType } from 'echarts/core'
import type { ECOption } from '@/components/ECharts/config'
import echarts from '@/components/ECharts/config'

const refChart = ref()
const chartInstance = ref<EChartsType>()
const xChartData = ref()
const yChartData = ref()
// 局部刷新定时器
let timer: number | null = null

onMounted(() => {
  // 图表初始化
  initChart()
  // 获取接口数据
  getData()
  // 局部刷新定时器
  getDataTimer()
})

onUnmounted(() => {
  // 清除局部刷新定时器
  timer && clearInterval(timer)
  timer = null
})

const initOption: ECOption = {
  title: {
    text: '🍉近10日订单量',
    top: '0%',
    textStyle: {
      color: '#077EF8',
    },
  },
  grid: {
    top: '12%',
    left: '6%',
    bottom: '6%',
    right: '0',
  },
  tooltip: {
    show: true,
  },
  legend: {
    data: ['柱形订单量', '折线订单量'],
    right: '5%',
  },
  xAxis: [
    {
      type: 'category',
      axisPointer: {
        type: 'shadow',
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      // 去掉背景横刻度线
      splitLine: { show: false },
    },
  ],
  series: [
    {
      name: '柱形订单量',
      type: 'bar',
      tooltip: {
        valueFormatter(value: any) {
          return `${value} V`
        },
      },
    },
    {
      name: '折线订单量',
      type: 'line',
      tooltip: {
        valueFormatter(value: any) {
          return `${value} V`
        },
      },
      // 圆滑连接
      smooth: true,
      itemStyle: {
        color: '#00f2f1', // 线颜色
      },
    },
  ],
}

function initChart() {
  chartInstance.value = refChart.value.getInstance()
}

function randomInt(m: number, n: number) {
  const num = Math.floor(Math.random() * (m - n) + n)
  return num
}

function getData() {
  // 先进行置空
  xChartData.value = []
  yChartData.value = []
  const num1 = randomInt(100, 200)
  const num2 = randomInt(200, 500)
  const num3 = randomInt(200, 500)
  const num4 = randomInt(500, 700)
  const num5 = randomInt(500, 700)
  const num6 = randomInt(700, 800)
  const num7 = randomInt(800, 900)
  const num8 = randomInt(900, 1000)
  xChartData.value = [
    '09-03',
    '09-04',
    '09-05',
    '09-06',
    '09-07',
    '09-08',
    '09-09',
    '09-10',
  ]
  yChartData.value.push(num1, num2, num3, num4, num5, num6, num7, num8)
  updateChart()
}

function updateChart() {
  const colorArr = [
    ['#0BA82C', '#4FF778'],
    ['#2E72BF', '#23E5E5'],
    ['#5052EE', '#AB6EE5'],
    ['hotpink', 'lightsalmon'],
  ]
  // 处理图表需要的数据
  const dataOption = {
    xAxis: {
      // x轴刻度文字
      data: xChartData.value,
    },
    series: [
      {
        // y轴柱形耗电量数据
        data: yChartData.value,
        itemStyle: {
          // 颜色样式部分
          label: {
            show: true, // 开启数字显示
            position: 'top', // 在上方显示数字
            textStyle: {
              // 数值样式
              color: '#077EF8', // 字体颜色
              // fontSize: 10, //字体大小
            },
          },
          //   柱状图颜色渐变
          color: (arg: any) => {
            let targetColorArr: (typeof colorArr)[0] = []
            if (arg.value > 700)
              targetColorArr = colorArr[0]
            else if (arg.value > 500)
              targetColorArr = colorArr[1]
            else if (arg.value > 200)
              targetColorArr = colorArr[2]
            else targetColorArr = colorArr[3]

            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: targetColorArr[0],
              },
              {
                offset: 1,
                color: targetColorArr[1],
              },
            ])
          },
        },
      },

      {
        // y轴折线耗电量数据
        data: yChartData.value,
      },
    ],
  }
  // 图表数据变化配置
  chartInstance.value!.setOption(dataOption)
}

// 定时器
function getDataTimer() {
  timer && clearInterval(timer)
  timer = setInterval(() => {
    // 执行刷新数据的方法
    getData()
  }, 3000)
}
</script>

<template>
  <ECharts ref="refChart" :option="initOption" :height="350" />
</template>
