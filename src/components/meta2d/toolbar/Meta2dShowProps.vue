<script setup lang="ts">
const showProps = defineModel<boolean>()

const content = computed(() => {
  return ['显示属性栏', '隐藏属性栏'][Number(showProps.value)]
})
</script>

<template>
  <a-tooltip :content="content">
    <div v-if="showProps" i-tabler-layout-sidebar-right-collapse cursor-pointer icon-btn @click="showProps = false" />
    <div v-else i-tabler-layout-sidebar-right-expand cursor-pointer icon-btn @click="showProps = true" />
  </a-tooltip>
</template>
