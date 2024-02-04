<script setup lang="ts">
import type { EChartsType } from 'echarts/core'
import type { ECOption } from '@/components/ECharts/config'
import echarts from '@/components/ECharts/config'

const refChart = ref()
const chartInstance = ref<EChartsType>()
const allData = ref([
  {
    name: '河南',
    value: 366,
  },
  {
    name: '郑州',
    value: 356,
  },
  {
    name: '广东',
    value: 335,
  },
  {
    name: '福建',
    value: 320,
  },
  {
    name: '浙江',
    value: 302,
  },
  {
    name: '上海',
    value: 280,
  },
  {
    name: '北京',
    value: 256,
  },
  {
    name: '江苏',
    value: 236,
  },
  {
    name: '四川',
    value: 290,
  },
  {
    name: '重庆',
    value: 195,
  },
  {
    name: '陕西',
    value: 160,
  },
  {
    name: '湖南',
    value: 140,
  },
  {
    name: '河北',
    value: 170,
  },
  {
    name: '辽宁',
    value: 152,
  },
  {
    name: '湖北',
    value: 120,
  },
  {
    name: '江西',
    value: 99,
  },
  {
    name: '天津',
    value: 107,
  },
  {
    name: '吉林',
    value: 90,
  },
  {
    name: '青海',
    value: 69,
  },
  {
    name: '山东',
    value: 266,
  },
  {
    name: '山西',
    value: 65,
  },
  {
    name: '云南',
    value: 87,
  },
  {
    name: '安徽',
    value: 79,
  },
])
// 局部刷新定时器
let timer: number | null = null
// 区域缩放的起点值
const startValue = ref(-1)
// 区域缩放的终点值
const endValue = ref(9)

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
    text: '👻地区异常订单排行',
    left: 0,
    top: 0,
    textStyle: {
      color: '#077EF8',
    },
  },
  grid: {
    top: '12%',
    left: '0',
    right: '0',
    bottom: '0',
    containLabel: true,
  },
  tooltip: {
    show: true,
  },
  xAxis: {
    type: 'category',
  },
  yAxis: {
    type: 'value',
    // 去掉背景横刻度线
    splitLine: { show: false },
  },
  series: [
    {
      type: 'bar',
      label: {
        color: '#077EF8', // 设置顶部数字颜色
        show: true, // 开启数字显示
        position: 'top', // 在上方显示数字
      },
    },
  ],
}

// 初始化加载图表
function initChart() {
  // 覆盖默认主题
  // echarts.registerTheme('myTheme', skin);
  chartInstance.value = refChart.value.getInstance()

  // 鼠标移入停止定时器
  chartInstance.value!.on('mouseover', () => {
    timer && clearInterval(timer)
  })

  // 鼠标移入启动定时器
  chartInstance.value!.on('mouseout', () => {
    getDataTimer()
  })
}

// 获取接口
function getData() {
  allData.value = allData.value.sort((a, b) => {
    return b.value - a.value
  })
  startValue.value++
  endValue.value++
  // 限制柱形图一直+1范围
  if (endValue.value > allData.value.length - 1) {
    startValue.value = 0
    endValue.value = 9
  }
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
  const provinceArr = allData.value.map((item) => {
    return item.name
  })
  const valueArr = allData.value.map((item) => {
    return item.value
  })

  const dataOption = {
    xAxis: { data: provinceArr },
    series: [
      {
        data: valueArr,
        itemStyle: {
          // 颜色样式部分
          label: {
            show: true, // 开启数字显示
            position: 'top', // 在上方显示数字
          },
          // 柱状图颜色渐变
          color: (arg: any) => {
            let targetColorArr: any = 'lightpink'
            if (arg.value > 300)
              targetColorArr = colorArr[0]
            else if (arg.value > 200)
              targetColorArr = colorArr[1]
            else if (arg.value > 100)
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
    ],
    // 推送数据
    dataZoom: {
      show: false,
      startValue: startValue.value,
      endValue: endValue.value,
    },
  }
  // 图表数据变化配置
  chartInstance.value!.setOption(dataOption)
}

// 图表定时器
function getDataTimer() {
  timer && clearInterval(timer)
  timer = setInterval(() => {
    // 执行刷新数据的方法
    getData()
  }, 2000)
}
</script>

<template>
  <ECharts ref="refChart" :option="initOption" :height="350" />
</template>
