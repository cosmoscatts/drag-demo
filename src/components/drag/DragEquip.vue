<script setup lang="ts">
import equipImage from '~/images/drag/equip.jpg'
</script>

<template>
  <DragWrapper v-bind="$attrs">
    <div h-full w-full flex-center p-10px>
      <img h-full :src="equipImage">
    </div>
  </DragWrapper>
</template>
