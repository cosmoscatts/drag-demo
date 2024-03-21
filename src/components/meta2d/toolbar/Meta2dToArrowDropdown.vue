<script setup lang="ts">
const { currentToArrow, toArrows, changeToArrow } = getToArrowInfo()
</script>

<template>
  <a-dropdown trigger="hover">
    <div>
      <svg cursor-pointer text-lg icon-btn class="l-icon" aria-hidden="true">
        <use
          :xlink:href="
            toArrows.find((item) => item.value === currentToArrow)?.icon
          "
        />
      </svg>
    </div>
    <template #content>
      <a-doption v-for="item in toArrows" :key="item.value">
        <div flex-center @click="changeToArrow(item.value)">
          <svg class="l-icon" aria-hidden="true">
            <use :xlink:href="item.icon" />
          </svg>
        </div>
      </a-doption>
    </template>
  </a-dropdown>
</template>
