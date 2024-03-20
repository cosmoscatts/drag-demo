<script setup lang="ts">
const { points = [], pointTitle = '' } = defineProps<{
  points?: string[]
  pointTitle?: string
}>()
</script>

<template>
  <DragWrapper v-bind="$attrs">
    <div flex="~ col" h-full w-full flex-center rounded p-10px border="1 [var(--color-neutral-6)]" bg="[var(--color-neutral-2)]">
      <div mb-1 flex-center text-sm text-primary>
        {{ pointTitle }}
      </div>
      <div v-for="point in points" :key="point" grid="~ cols-4 gap-4" flex-center>
        <div i-carbon-circle-solid col-span-1 mr-4 text-14px text-green />
        <div col-span-3>
          {{ point }}
        </div>
      </div>
    </div>
  </DragWrapper>
</template>
