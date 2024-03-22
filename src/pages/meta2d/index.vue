<script setup lang="ts">
import Meta2dGraphics from './components/Meta2dGraphics.vue'
import Meta2dToolbar from './components/Meta2dToolbar.vue'
import { LAYOUT_PARAMS as params } from '~/constants'

const refToolbar = ref()
const showProps = ref(true)

const contentHeight = computed(() => {
  return `calc(100vh - ${getLayoutContentHeight().value + params.contentPadding * 2 + params.footHeight}px)`
})

const isViewMounted = useMounted()
provide('isViewMounted', isViewMounted)

function updateFilePropsCallback() {
  refToolbar.value?.updateDisableScale()
}
provide('updateFilePropsCallback', updateFilePropsCallback)

const previewVisible = ref(false)
function preview() {
  // 先停止动画，避免数据波动
  meta2d.stopAnimate()
  // 本地存储
  const data: any = deepClone(meta2d.data())
  localStorage.setItem('meta2d', JSON.stringify(data))
  previewVisible.value = true
}
provide('preview', preview)
</script>

<template>
  <div>
    <Meta2dToolbar ref="refToolbar" v-model="showProps" v-model:visible="previewVisible" />
    <div grid="~ cols-7" border="1 base" :style="{ height: contentHeight }">
      <div col-span-1 border="r-1 base" :style="{ height: contentHeight }" of-y-auto>
        <Meta2dGraphics />
      </div>
      <Meta2dContextMenu>
        <Meta2dView v-if="!previewVisible" :style="{ height: contentHeight, width: '100%' }" :class="showProps ? 'col-span-5' : 'col-span-6'" />
      </Meta2dContextMenu>
      <div v-show="showProps" col-span-1 border="l-1 base" :style="{ height: contentHeight }" of-y-auto>
        <Meta2dProps />
      </div>
    </div>
  </div>
</template>
