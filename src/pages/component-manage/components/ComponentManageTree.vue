<script setup lang="ts">
import type { TreeNodeData } from '@arco-design/web-vue'

const { treeData = [] } = defineProps<{
  treeData?: TreeNodeData[]
}>()
</script>

<template>
  <a-tree :data="treeData">
    <template #icon>
      <IconStar />
    </template>
  </a-tree>
</template>
