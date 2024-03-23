<script lang="ts" setup>
import type { Pen } from '@meta2d/core'

const { selections } = useMeta2dSelection()

const form = reactive<any>({
  id: '',
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  //
  text: '',
  color: '',
  background: '',
  dash: 0,
  borderRadius: 0,
  globalAlpha: 1,
  textAlign: '',
  textBaseline: '',
})

function getPen() {
  const pen = selections.pen
  if (!pen) return
  form.id = pen.id || ''
  form.text = pen.text || ''
  form.color = pen.color || ''
  form.background = pen.background || ''
  form.dash = (pen as any).dash || 0
  form.borderRadius = pen.borderRadius || 0
  form.globalAlpha = pen.globalAlpha || 1
  form.textAlign = pen.textAlign || 'center'
  form.textBaseline = pen.textBaseline || 'middle'

  const rect = meta2d.getPenRect(pen as Pen)
  if (rect) {
    form.x = rect.x || 0
    form.y = rect.y || 0
    form.width = rect.width || 0
    form.height = rect.height || 0
  }
}

// 监听选中不同图元
watch(() => selections.pen?.id, getPen)

const lineDashs = [undefined, [5, 5]]

function changeValue(prop: string) {
  const v: any = { id: form.id }
  v[prop] = form[prop]
  if (prop === 'dash') {
    v.lineDash = lineDashs[v[prop]]
  }
  meta2d.setValue(v, { render: true })
}

function changeRect(prop: string) {
  const v: any = { id: form.id }
  v[prop] = form[prop]
  meta2d.setValue(v, { render: true })
}

onMounted(getPen)
</script>

<template>
  <div>
    <a-form v-if="selections.pen" :model="form" auto-label-width label-align="left" size="small">
      <h5 mb-4 font-bold>
        图元
      </h5>
      <a-form-item label="文本" name="text">
        <a-input v-model="form.text" @change="changeValue('text')" />
      </a-form-item>
      <!-- <a-form-item label="颜色" name="color">
        <a-color-picker v-model="form.color" w-full @change="changeValue('color')" />
      </a-form-item>
      <a-form-item label="背景" name="background">
        <a-color-picker v-model="form.background" w-full @change="changeValue('background')" />
      </a-form-item> -->
      <a-form-item label="线条" name="dash">
        <a-select v-model="form.dash" @change="changeValue('dash')">
          <a-option :key="0" :value="0" label="实线" />
          <a-option :key="1" :value="1" label="虚线" />
        </a-select>
      </a-form-item>
      <a-form-item label="圆角" name="borderRadius">
        <a-input-number
          v-model="form.borderRadius"
          :min="0"
          :max="1"
          hide-button
          @change="changeValue('borderRadius')"
        />
      </a-form-item>
      <a-form-item label="不透明度" name="globalAlpha">
        <a-slider
          v-model="form.globalAlpha"
          :min="0"
          :max="1"
          :step="0.01"
          @change="changeValue('globalAlpha')"
        />
      </a-form-item>

      <a-divider />

      <a-form-item label="X" name="x">
        <a-input-number v-model="form.x" hide-button @change="changeRect('x')" />
      </a-form-item>
      <a-form-item label="Y" name="y">
        <a-input-number v-model="form.y" hide-button @change="changeRect('y')" />
      </a-form-item>
      <a-form-item label="宽" name="width">
        <a-input-number v-model="form.width" hide-button @change="changeRect('width')" />
      </a-form-item>
      <a-form-item label="高" name="height">
        <a-input-number v-model="form.height" hide-button @change="changeRect('height')" />
      </a-form-item>

      <a-divider />

      <a-form-item label="文字水平" name="textAlign">
        <a-select v-model="form.textAlign" @change="changeValue('textAlign')">
          <a-option key="left" value="left" label="左对齐" />
          <a-option key="center" value="center" label="居中" />
          <a-option key="right" value="right" label="右对齐" />
        </a-select>
      </a-form-item>
      <a-form-item label="文字垂直" name="textBaseline">
        <a-select
          v-model="form.textBaseline"
          @change="changeValue('textBaseline')"
        >
          <a-option key="top" value="top" label="顶部对齐" />
          <a-option key="middle" value="middle" label="居中" />
          <a-option key="bottom" value="bottom" label="底部对齐" />
        </a-select>
      </a-form-item>
    </a-form>
  </div>
</template>
