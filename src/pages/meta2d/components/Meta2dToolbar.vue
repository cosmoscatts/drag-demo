<script setup lang="ts">
import { deepClone } from '@meta2d/core'

const isViewMounted = inject('isViewMounted') as Ref<boolean>

const refShowProps = ref()

const disableScale = ref(true)
function updateDisableScale() {
  if (!isViewMounted.value) {
    disableScale.value = true
    return
  }
  disableScale.value = meta2d.getOptions()?.disableScale || false
}

onMounted(async () => {
  await until(isViewMounted)
  updateDisableScale()
})

function undo() {
  meta2d.undo()
}

function redo() {
  meta2d.redo()
}

function clear() {
  useConfirm({
    title: '提示',
    content: '确定要清空图纸吗？',
    ok() {
      meta2d.clear()
      Message.success('清空图纸成功')
    },
  })
}

const scale = ref(0)

onMounted(() => {
  const timer = setInterval(() => {
    if (meta2d) {
      clearInterval(timer)
      // 获取初始缩放比例
      scaleSubscriber(meta2d.store.data.scale)

      // 监听缩放
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      meta2d.on('scale', scaleSubscriber)
    }
  }, 200)
})

function scaleSubscriber(val: number) {
  scale.value = Math.round(val * 100)
}

function scaleDefault() {
  meta2d.scale(1)
  meta2d.centerView()
}

function scaleWindow() {
  meta2d.fitView()
}

const { selections } = useMeta2dSelection()
function checkoutFileProps() {
  refShowProps.value?.justShowProps?.()
  selections.mode = SelectionMode.File
  selections.pen = undefined
  selections.pens = []
}

function save() {
  Message.success('图纸数据已保存成功')
  const data = deepClone(meta2d.data())
  localStorage.setItem('meta2d', JSON.stringify(data))
}

const preview = inject('preview') as () => void

defineExpose({
  updateDisableScale,
})
</script>

<template>
  <div h-30px border="1 base b-0" w-full flex-y-center justify-between px-10px>
    <div flex-y-center gap-2>
      <div mr-4 font-bold>
        工具栏
      </div>

      <a-tooltip content="撤销">
        <div i-ion-ios-undo cursor-pointer icon-btn @click="undo" />
      </a-tooltip>
      <a-tooltip content="重做">
        <div i-ion-ios-redo cursor-pointer icon-btn @click="redo" />
      </a-tooltip>

      <a-divider direction="vertical" />

      <Meta2dText />

      <Meta2dPen />

      <Meta2dPencil />

      <Meta2dLine />

      <!-- 连线 -->
      <Meta2dDrawLine />

      <a-divider direction="vertical" />

      <!-- 连线类型 -->
      <Meta2dLineTypeDropdown />

      <!-- 左箭头类型 -->
      <Meta2dFromArrowDropdown />

      <!-- 右箭头类型 -->
      <Meta2dToArrowDropdown />

      <a-divider direction="vertical" />

      <div op-50>
        {{ scale }}%
      </div>
      <a-tooltip content="恢复默认缩放">
        <div i-mingcute-refresh-2-line cursor-pointer icon-btn :class="disableScale ? 'pointer-events-none op-10' : ''" @click="scaleDefault" />
      </a-tooltip>
      <a-tooltip content="元素聚焦">
        <div i-fluent-table-resize-column-24-regular cursor-pointer icon-btn :class="disableScale ? 'pointer-events-none op-10' : ''" @click="scaleWindow" />
      </a-tooltip>
      <div v-if="disableScale" text-sm op-30>
        (已禁用缩放)
      </div>
    </div>

    <div flex-y-center gap-2>
      <Meta2dFileDropdown />

      <Meta2dMiniMap />

      <Meta2dMagnifier />

      <div cursor-pointer hover:text-primary @click="preview">
        预览
      </div>
      <div cursor-pointer hover:text-primary @click="checkoutFileProps">
        设置
      </div>

      <Meta2dShowProps ref="refShowProps" :="$attrs" />

      <a-divider direction="vertical" />

      <div cursor-pointer hover:text-primary @click="clear">
        清空图纸
      </div>
      <div cursor-pointer hover:text-primary @click="save">
        保存
      </div>
    </div>

    <Meta2dPreviewModal :="$attrs" />
  </div>
</template>
