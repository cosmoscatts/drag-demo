<script lang="ts" setup>
import { SelectionMode, useSelection } from '../selection'
import Meta2dFileProps from './Meta2dFileProps.vue'
import Meta2dPenProps from './Meta2dPenProps.vue'

const { selections } = useSelection()
</script>

<template>
  <div h-full p-16px>
    <Meta2dFileProps v-if="selections.mode === SelectionMode.File" />
    <Meta2dPenProps v-else-if="selections.mode === SelectionMode.Pen" />
  </div>
</template>
