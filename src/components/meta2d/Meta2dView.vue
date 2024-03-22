<script setup lang="ts">
import { Meta2d } from '@meta2d/core'

const refEl = ref()
const { width, height } = useElementSize(refEl)

watch([width, height], ([w, h]) => {
  meta2d.resize(w, h)
})

watch(isDark, changeMeta2dColor)

onMounted(() => {
  // 创建实例
  // eslint-disable-next-line no-new
  new Meta2d('meta2d', defaultMeta2dOptions)

  // 注册图形库
  registerMeta2dPlugins()

  // 从缓存加载数据
  loadMeta2dData()

  // 适配暗色风格颜色
  changeMeta2dColor()

  // 绑定激活事件
  bindMeta2dActive()
})

onUnmounted(() => {
  meta2d.destroy()
})
</script>

<template>
  <div id="meta2d" ref="refEl" />
</template>
