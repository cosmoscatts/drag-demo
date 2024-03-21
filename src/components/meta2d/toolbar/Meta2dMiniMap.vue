<script setup lang="ts">
const showMiniMap = ref(false)

function toggle() {
  showMiniMap.value = !showMiniMap.value
}

onMounted(() => {
  useTimeoutFn(() => {
    if (!meta2d) return
    if (showMiniMap.value)
      meta2d.showMap()
    else {
      if (meta2d.map?.isShow)
        meta2d.hideMap()
    }
  }, 500)
})

watch(showMiniMap, (n) => {
  if (n)
    meta2d.showMap()
  else
    meta2d.hideMap()
})
</script>

<template>
  <div flex-y-center cursor-pointer gap-1 hover:text-primary :class="showMiniMap ? 'text-primary' : ''" @click="toggle">
    <div i-solar-point-on-map-outline />
    缩略图
  </div>
</template>
