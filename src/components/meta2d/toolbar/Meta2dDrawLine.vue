<script setup lang="ts">
const isDrawLine = ref(false)

function drawLine() {
  if (isDrawLine.value) {
    isDrawLine.value = false
    meta2d.finishDrawLine()
    meta2d.drawLine()
    meta2d.store.options.disableAnchor = true
  } else {
    isDrawLine.value = true
    meta2d.drawLine(meta2d.store.options.drawingLineName)
    meta2d.store.options.disableAnchor = false
  }
}
</script>

<template>
  <a-tooltip content="连线">
    <div>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        :class="isDrawLine ? 'text-primary !op100' : ''"
        cursor-pointer
        icon-btn @click="drawLine"
      >
        <path
          d="M192 64a128 128 0 0 1 123.968 96H384a160 160 0 0 1 159.68 149.504L544 320v384a96 96 0 0 0 86.784 95.552L640 800h68.032a128 128 0 1 1 0 64.064L640 864a160 160 0 0 1-159.68-149.504L480 704V320a96 96 0 0 0-86.784-95.552L384 224l-68.032 0.064A128 128 0 1 1 192 64z m640 704a64 64 0 1 0 0 128 64 64 0 0 0 0-128zM192 128a64 64 0 1 0 0 128 64 64 0 0 0 0-128z"
          fill="currentColor"
        />
      </svg>
    </div>
  </a-tooltip>
</template>
