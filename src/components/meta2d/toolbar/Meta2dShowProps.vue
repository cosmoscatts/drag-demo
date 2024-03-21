<script setup lang="ts">
const showProps = defineModel<boolean>()

const content = computed(() => {
  return ['显示属性栏', '隐藏属性栏'][Number(showProps.value)]
})

/**
 * 强制显示，配合设置按钮
 */
function justShowProps() {
  showProps.value = true
}

defineExpose({
  justShowProps,
})
</script>

<template>
  <a-tooltip :content="content">
    <div v-if="showProps" i-tabler-layout-sidebar-right-collapse cursor-pointer op100 icon-btn @click="showProps = false" />
    <div v-else i-tabler-layout-sidebar-right-expand cursor-pointer op100 icon-btn @click="showProps = true" />
  </a-tooltip>
</template>
