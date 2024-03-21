<script lang="ts" setup>
const { selections } = useMeta2dSelection()

const pen = ref<any>()
// 位置数据。当前版本位置需要动态计算获取
const rect = ref<any>()

const form = reactive({})

onMounted(() => {
  getPen()
})

function getPen() {
  pen.value = selections.pen
  if (pen.value.globalAlpha === undefined) {
    pen.value.globalAlpha = 1
  }
  rect.value = meta2d?.getPenRect?.(pen.value)
}

// 监听选中不同图元
const watcher = watch(() => selections.pen?.id, getPen)

const lineDashs = [undefined, [5, 5]]

function changeValue(prop: string) {
  const v: any = { id: pen.value.id }
  v[prop] = pen.value[prop]
  if (prop === 'dash') {
    v.lineDash = lineDashs[v[prop]]
  }
  meta2d.setValue(v, { render: true })
}

function changeRect(prop: string) {
  const v: any = { id: pen.value.id }
  v[prop] = rect.value[prop]
  meta2d.setValue(v, { render: true })
}

// function top() {
//   meta2d.top()
//   meta2d.render()
// }
// function bottom() {
//   meta2d.bottom()
//   meta2d.render()
// }
// function up() {
//   meta2d.up()
//   meta2d.render()
// }
// function down() {
//   meta2d.down()
//   meta2d.render()
// }

onUnmounted(() => {
  watcher()
})
</script>

<template>
  <div>
    <a-form v-if="pen" :model="form" auto-label-width label-align="left" size="small">
      <h5 mb-4 font-bold>
        图元
      </h5>
      <a-form-item label="文本" name="text">
        <a-input v-model="pen.text" @change="changeValue('text')" />
      </a-form-item>
      <!-- <a-form-item label="颜色" name="color">
        <a-color-picker v-model="pen.color" w-full @change="changeValue('color')" />
      </a-form-item> -->
      <!-- <a-form-item label="背景" name="background">
        <a-color-picker v-model="pen.background" w-full @change="changeValue('background')" />
      </a-form-item> -->
      <a-form-item label="线条" name="dash">
        <a-select v-model="pen.dash" @change="changeValue('dash')">
          <a-option :key="0" :value="0" label="实线" />
          <a-option :key="1" :value="1" label="虚线" />
        </a-select>
      </a-form-item>
      <a-form-item label="圆角" name="borderRadius">
        <a-input-number
          v-model="pen.borderRadius"
          :min="0"
          :max="1"
          hide-button
          @change="changeValue('borderRadius')"
        />
      </a-form-item>
      <a-form-item label="不透明度" name="globalAlpha">
        <a-slider
          v-model="pen.globalAlpha"
          :min="0"
          :max="1"
          :step="0.01"
          @change="changeValue('globalAlpha')"
        />
        <span class="ml-16" style="width: 50px; line-height: 30px">
          {{ pen.globalAlpha }}
        </span>
      </a-form-item>

      <a-divider />

      <a-form-item label="X" name="x">
        <a-input-number v-model="rect.x" hide-button @change="changeRect('x')" />
      </a-form-item>
      <a-form-item label="Y" name="y">
        <a-input-number v-model="rect.y" hide-button @change="changeRect('y')" />
      </a-form-item>
      <a-form-item label="宽" name="width">
        <a-input-number v-model="rect.width" hide-button @change="changeRect('width')" />
      </a-form-item>
      <a-form-item label="高" name="height">
        <a-input-number v-model="rect.height" hide-button @change="changeRect('height')" />
      </a-form-item>

      <a-divider />

      <a-form-item label="文字水平对齐" name="textAlign">
        <a-select v-model="pen.textAlign" @change="changeValue('textAlign')">
          <a-option key="left" value="left" label="左对齐" />
          <a-option key="center" value="center" label="居中" />
          <a-option key="right" value="right" label="右对齐" />
        </a-select>
      </a-form-item>
      <a-form-item label="文字垂直对齐" name="textBaseline">
        <a-select
          v-model="pen.textBaseline"
          @change="changeValue('textBaseline')"
        >
          <a-option key="top" value="top" label="顶部对齐" />
          <a-option key="middle" value="middle" label="居中" />
          <a-option key="bottom" value="bottom" label="底部对齐" />
        </a-select>
      </a-form-item>

      <a-divider />

      <!-- <a-space>
        <a-button @click="top">
          置顶
        </a-button>
        <a-button @click="bottom">
          置底
        </a-button>
        <a-button @click="up">
          上一层
        </a-button>
        <a-button @click="down">
          下一层
        </a-button>
      </a-space> -->
    </a-form>
  </div>
</template>
