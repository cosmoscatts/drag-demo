<script setup lang="ts">
const selected = ref(false)

function clear() {
  selected.value = false
  meta2d.canvas.addCaches = []
}

function onClick(event: DragEvent | MouseEvent, name: string) {
  selected.value = true
  addMeta2dShape(event, name)
}

function onDrag(event: DragEvent | MouseEvent, name: string) {
  addMeta2dShape(event, name)
}

const refEl = ref()

onClickOutside(refEl, clear)
</script>

<template>
  <a-tooltip content="直线">
    <div
      ref="refEl" :class="selected ? 'text-primary !op100' : ''"
      i-tabler-slash cursor-pointer icon-btn :draggable="true"
      @dragstart="onDrag($event, 'line')"
      @click="onClick($event, 'line')"
    />
  </a-tooltip>
</template>
