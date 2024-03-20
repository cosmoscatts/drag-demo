<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>

<template>
  <DragWrapper v-bind="$attrs">
    <div h-full w-full flex-center p-10px text-xl font-bold>
      <slot>
        <div border="1 primary" px-10px py-3px bg="primary/20">
          {{ text }}
        </div>
      </slot>
    </div>
  </DragWrapper>
</template>
