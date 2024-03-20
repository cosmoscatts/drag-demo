<script setup lang="ts">
import VueDraggableResizable from 'vue-draggable-resizable'

const {
  scale = 1,
  draggable = true,
  resizable = true,
  z = 0,
} = defineProps<{
  id?: string
  scale?: number // 缩放比例 0 - 1
  draggable?: boolean
  resizable?: boolean
  z?: number
}>()
// 坐标
const x = defineModel<number>('x')
const y = defineModel<number>('y')
// 宽高
const w = defineModel<number | string>('w', { default: 'auto' })
const h = defineModel<number | string>('h', { default: 'auto' })

function onDragging(draggingX: number, draggingY: number) {
  x.value = draggingX
  y.value = draggingY
}

function dragstop(_draggingX: number, _draggingY: number) {
  // console.log(`${id} ,` + `x: ${draggingX}y, ${draggingY}`)
}

function onResizing(resizeX: number, resizeY: number, resizeWidth: number, resizeHeight: number) {
  x.value = resizeX
  y.value = resizeY
  w.value = resizeWidth
  y.value = resizeHeight
}

const borderColor = computed(() => isDark.value ? 'white' : 'black')
</script>

<template>
  <VueDraggableResizable
    :w="w"
    :h="h"
    :x="x"
    :y="y"
    :z="z"
    :scale="scale"
    :parent="true"
    :draggable="draggable"
    :resizable="resizable"
    @dragging="onDragging"
    @resizing="onResizing"
    @drag-stop="dragstop"
  >
    <slot />
  </VueDraggableResizable>
</template>

<style>
.vdr {
  border: 0px dashed v-bind(borderColor)!important;
}

.active.vdr {
  border: 1px dashed v-bind(borderColor)!important;
}
</style>
