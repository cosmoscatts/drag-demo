<script setup lang="ts">
const showMagnifier = ref(false)

function toggle() {
  showMagnifier.value = !showMagnifier.value
}

watch(showMagnifier, (n) => {
  if (n)
    meta2d.showMagnifier()
  else
    meta2d.hideMagnifier()
})
</script>

<template>
  <div flex-y-center cursor-pointer gap-1 hover:text-primary :class="showMagnifier ? 'text-primary' : ''" @click="toggle">
    <div i-ph-magnifying-glass-plus />
    放大镜
  </div>
</template>
