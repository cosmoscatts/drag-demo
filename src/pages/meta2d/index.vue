<script setup lang="ts">
import type { Pen } from '@meta2d/core'
import {
  Meta2d,
  register,
  registerAnchors,
  registerCanvasDraw,
} from '@meta2d/core'
import { flowAnchors, flowPens } from '@meta2d/flow-diagram'
import {
  activityDiagram,
  activityDiagramByCtx,
} from '@meta2d/activity-diagram'
import { classPens } from '@meta2d/class-diagram'
import { sequencePens, sequencePensbyCtx } from '@meta2d/sequence-diagram'
import { register as registerEcharts } from '@meta2d/chart-diagram'
import { formPens } from '@meta2d/form-diagram'
import { chartsPens } from '@meta2d/le5le-charts'
import { ftaAnchors, ftaPens, ftaPensbyCtx } from '@meta2d/fta-diagram'

import { useSelection } from './selection'
import Meta2dGraphics from './component/Meta2dGraphics.vue'
import Meta2dProps from './component/Meta2dProps.vue'

import { LAYOUT_PARAMS as params } from '~/constants'
import equipImage2 from '~/images/drag/gaoyagang.svg'

const { select } = useSelection()

const gridColor = computed(() => isDark.value ? '#484849' : '#E5E6EB')

const meta2dOptions: any = {
  rule: true, // 是否开启标尺
  disableScale: true,
  gridColor: gridColor.value,
  grid: true, // 背景网格
}

watch(isDark, () => {
  meta2d.setGrid({
    gridColor: gridColor.value,
  })
  Object.values(meta2d.store.pens).forEach((pen) => {
    meta2d.setValue({
      id: pen.id,
      color: isDark.value ? '#F6F6F6' : '#1D2129',
    })
  })
  meta2d.render()
})

onMounted(() => {
  // 创建实例
  // eslint-disable-next-line no-new
  new Meta2d('meta2d', meta2dOptions)

  // 按需注册图形库
  // 以下为自带基础图形库
  register(flowPens())
  registerAnchors(flowAnchors())
  register(activityDiagram())
  registerCanvasDraw(activityDiagramByCtx())
  register(classPens())
  register(sequencePens())
  registerCanvasDraw(sequencePensbyCtx())
  registerEcharts()
  registerCanvasDraw(formPens())
  registerCanvasDraw(chartsPens())
  register(ftaPens())
  registerCanvasDraw(ftaPensbyCtx())
  registerAnchors(ftaAnchors())

  // 注册其他自定义图形库
  // ...

  // 读取本地存储
  let data: any = localStorage.getItem('meta2d')
  if (data) {
    data = JSON.parse(data)

    // 判断是否为运行查看，是-设置为预览模式
    if (location.pathname === '/preview') {
      data.locked = 1
    } else {
      data.locked = 0
    }
    meta2d.open(data)
  }

  const pens = [
    {
      name: 'rectangle',
      text: '矩形',
      x: 100,
      y: 100,
      width: 100,
      height: 100,
    },
    {
      width: 120,
      height: 80,
      x: 400,
      y: 100,
      image: equipImage2,
      name: 'image',
    },
  ]
  meta2d.addPens(pens)

  meta2d.on('active', active)
  meta2d.on('inactive', inactive)
})

function active(pens?: Pen[]) {
  select(pens)
}

function inactive() {
  select()
}

onUnmounted(() => {
  meta2d.destroy()
})

const contentHeight = computed(() => {
  return `calc(100vh - ${getLayoutContentHeight().value + params.contentPadding * 2 + params.footHeight}px)`
})
</script>

<template>
  <div grid="~ cols-7" border="1 base" :style="{ height: contentHeight }">
    <div col-span-1 border="r-1 base" :style="{ height: contentHeight }" of-y-auto>
      <Meta2dGraphics />
    </div>
    <div id="meta2d" col-span-5 :style="{ height: contentHeight }" />
    <div col-span-1 border="l-1 base" :style="{ height: contentHeight }" of-y-auto>
      <Meta2dProps />
    </div>
  </div>
</template>
