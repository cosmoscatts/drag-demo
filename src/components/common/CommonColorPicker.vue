<script setup lang="ts">
defineEmits(['change'])
const value = defineModel<string>()
</script>

<template>
  <div>
    <a-color-picker
      v-model:model-value="value"
      show-preset
      @change="$emit('change')"
    >
      <a-tag :color="value">
        <template #icon>
          <IconBgColors style="color: #fff" />
        </template>
        {{ value }}
      </a-tag>
    </a-color-picker>
  </div>
</template>
