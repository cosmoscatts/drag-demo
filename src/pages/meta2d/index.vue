<script setup lang="ts">
import { Meta2d } from '@meta2d/core'
import Meta2dGraphics from './components/Meta2dGraphics.vue'
import Meta2dToolbar from './components/Meta2dToolbar.vue'
import { LAYOUT_PARAMS as params } from '~/constants'

const refToolbar = ref()
const showProps = ref(true)

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

const contentHeight = computed(() => {
  return `calc(100vh - ${getLayoutContentHeight().value + params.contentPadding * 2 + params.footHeight}px)`
})

const refEl = ref()
const { width, height } = useElementSize(refEl)

watch([width, height], ([w, h]) => {
  meta2d.resize(w, h)
})

const isViewMounted = useMounted()
provide('isViewMounted', isViewMounted)

function updateFilePropsCallback() {
  refToolbar.value?.updateDisableScale()
}
provide('updateFilePropsCallback', updateFilePropsCallback)
</script>

<template>
  <div>
    <Meta2dToolbar ref="refToolbar" v-model="showProps" />
    <div grid="~ cols-7" border="1 base" :style="{ height: contentHeight }">
      <div col-span-1 border="r-1 base" :style="{ height: contentHeight }" of-y-auto>
        <Meta2dGraphics />
      </div>
      <div id="meta2d" ref="refEl" :style="{ height: contentHeight, width: '100%' }" :class="showProps ? 'col-span-5' : 'col-span-6'" />
      <div v-show="showProps" col-span-1 border="l-1 base" :style="{ height: contentHeight }" of-y-auto>
        <Meta2dProps />
      </div>
    </div>
  </div>
</template>
