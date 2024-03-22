<script setup lang="ts">
const visible = defineModel<boolean>('visible')
const contentHeight = computed(() => {
  return 'calc(100vh - 100px)'
})
</script>

<template>
  <a-modal v-model:visible="visible" :footer="false" fullscreen unmount-on-close title="图纸预览">
    <Meta2dPreview :style="{ height: contentHeight }" z-10000 w-full />
  </a-modal>
</template>
