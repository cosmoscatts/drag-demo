<script lang="ts" setup>
const { selections } = useSelection()
</script>

<template>
  <div h-full p-16px>
    <Meta2dFileProps v-if="selections.mode === SelectionMode.File" />
    <Meta2dPenProps v-else-if="selections.mode === SelectionMode.Pen" />
  </div>
</template>
