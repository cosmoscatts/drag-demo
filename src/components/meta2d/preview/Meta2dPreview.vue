<script setup lang="ts">
import type { Pen } from '@meta2d/core'
import { Meta2d } from '@meta2d/core'

const refEl = ref()
const { width, height } = useElementSize(refEl)

let previewMeta2d: Meta2d | null = null

watch([width, height], ([w, h]) => {
  if (previewMeta2d)
    previewMeta2d.resize(w, h)
})

function changeColor() {
  if (!previewMeta2d) return
  previewMeta2d.setGrid({
    gridColor: defaultMeta2dGridColor.value,
  })
  Object.values(previewMeta2d.store.pens).forEach((pen) => {
    previewMeta2d!.setValue({
      id: pen.id,
      color: isDark.value ? '#F6F6F6' : '#1D2129',
    })
  })
  previewMeta2d.render()
}

function loadData() {
  if (!previewMeta2d) return
  // 读取本地存储
  let data: any = localStorage.getItem('meta2d')
  if (data) {
    data = JSON.parse(data)
    data.locked = 1
    previewMeta2d.open(data)
  }
}
const { select } = useMeta2dSelection()
function active(pens?: Pen[]) {
  select(pens)
}
function inactive() {
  select()
}

onMounted(() => {
  // 创建实例
  previewMeta2d = new Meta2d('meta2d-preview', defaultMeta2dOptions)

  // 注册图形库
  registerMeta2dPlugins()

  // 从缓存加载数据
  loadData()

  // 适配暗色风格颜色
  changeColor()

  previewMeta2d.on('active', active)
  previewMeta2d.on('inactive', inactive)
})

watch(isDark, changeColor)
</script>

<template>
  <div id="meta2d-preview" ref="refEl" />
</template>
