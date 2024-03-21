<script setup lang="ts">
const { currentFromArrow, fromArrows, changeFromArrow } = getFormArrowInfo()
</script>

<template>
  <!-- 左箭头类型 -->
  <a-dropdown trigger="hover" :popup-max-height="false">
    <div>
      <svg cursor-pointer text-lg icon-btn class="l-icon" aria-hidden="true">
        <use
          :xlink:href="
            fromArrows.find((item) => item.value === currentFromArrow)?.icon
          "
        />
      </svg>
    </div>
    <template #content>
      <a-doption v-for="item in fromArrows" :key="item.value">
        <div flex-center @click="changeFromArrow(item.value)">
          <svg class="l-icon" aria-hidden="true" text-30px>
            <use :xlink:href="item.icon" />
          </svg>
        </div>
      </a-doption>
    </template>
  </a-dropdown>
</template>
