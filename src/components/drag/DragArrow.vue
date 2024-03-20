<script setup lang="ts">
const refEl = ref(null)
const { height } = useElementSize(refEl)
const size = computed(() => {
  return Math.max(height.value * 0.8, 32)
})
</script>

<template>
  <DragWrapper v-bind="$attrs">
    <div ref="refEl" h-full w-full flex-center>
      <IconArrowFall :size="size" color="red" />
    </div>
  </DragWrapper>
</template>
