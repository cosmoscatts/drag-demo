<script lang="ts" setup>
const form = reactive({
  // 画布选项
  grid: true,
  gridSize: 10,
  gridRotate: undefined,
  gridColor: undefined,
  rule: true,
  // 图纸数据
  name: '',
  background: undefined,
  color: undefined,
})

onMounted(() => {
  const d: any = meta2d.data?.()
  form.name = d?.name || ''
  form.background = d?.background
  form.color = d?.color

  Object.assign(form, meta2d.getOptions?.())
})

function onChangeData() {
  Object.assign(meta2d.store.data, form)
  ;(meta2d.store as any).patchFlagsBackground = true
  meta2d.render()
}

function onChangeOptions() {
  // const { grid, gridSize, gridColor, rule } = form
  // meta2d.setOptions({
  //   grid,
  //   gridColor,
  //   gridSize,
  //   // gridRotate,
  //   rule,
  // })
  // meta2d.store.patchFlagsTop = true
  // ;(meta2d.store as any).patchFlagsBackground = true
  // meta2d.render()
}
</script>

<template>
  <div>
    <h5 mb-4 font-bold>
      图纸
    </h5>
    <a-form :model="form" auto-label-width>
      <a-form-item label="图纸名称" name="name">
        <a-input v-model="form.name" @change="onChangeData" />
      </a-form-item>
      <a-divider />
      <a-form-item label="网格" name="grid">
        <a-switch v-model="form.grid" @change="onChangeOptions" />
      </a-form-item>
      <a-form-item label="网格大小" name="gridSize">
        <a-input-number v-model="form.gridSize" hide-button @change="onChangeOptions" />
      </a-form-item>
      <a-form-item label="网格角度" name="gridRotate">
        <a-input-number
          v-model="form.gridRotate"
          hide-button
          @change="onChangeOptions"
        />
      </a-form-item>
      <!-- <a-form-item label="网格颜色" name="gridColor">
        <a-color-picker v-model="form.gridColor" w-full @change="onChangeData" />
      </a-form-item> -->

      <a-divider />

      <a-form-item label="标尺" name="rule">
        <a-switch v-model="form.rule" @change="onChangeOptions" />
      </a-form-item>
      <!--
      <a-divider /> -->

      <!-- <a-form-item label="背景颜色" name="background">
        <a-color-picker v-model="form.background" w-full @change="onChangeData" />
      </a-form-item>
      <a-form-item label="图元默认颜色" name="color">
        <a-color-picker v-model="form.color" w-full @change="onChangeData" />
      </a-form-item> -->
    </a-form>
  </div>
</template>
