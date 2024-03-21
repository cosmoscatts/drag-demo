<script setup lang="ts">
const isDrawLine = ref<boolean>(false)

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
  meta2d.clear()
}
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

      <div i-ri-text cursor-pointer icon-btn />
      <div i-ri-pen-nib-line cursor-pointer icon-btn />
      <div i-ri-ball-pen-line cursor-pointer icon-btn />
      <div i-tabler-slash cursor-pointer icon-btn />

      <!-- 连线 -->
      <div>
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          :style="{
            color: isDrawLine ? 'var(--primary-6)' : '',
          }"
          cursor-pointer icon-btn
        >
          <path
            d="M192 64a128 128 0 0 1 123.968 96H384a160 160 0 0 1 159.68 149.504L544 320v384a96 96 0 0 0 86.784 95.552L640 800h68.032a128 128 0 1 1 0 64.064L640 864a160 160 0 0 1-159.68-149.504L480 704V320a96 96 0 0 0-86.784-95.552L384 224l-68.032 0.064A128 128 0 1 1 192 64z m640 704a64 64 0 1 0 0 128 64 64 0 0 0 0-128zM192 128a64 64 0 1 0 0 128 64 64 0 0 0 0-128z"
            fill="currentColor"
          />
        </svg>
      </div>

      <a-divider direction="vertical" />

      <!-- 连线类型 -->
      <Meta2dLineTypeDropdown />

      <!-- 左箭头类型 -->
      <Meta2dFromArrowDropdown />

      <!-- 右箭头类型 -->
      <Meta2dToArrowDropdown />

      <a-divider direction="vertical" />

      <div op-50>
        100%
      </div>
      <div i-mingcute-refresh-2-line cursor-pointer icon-btn />
      <div i-fluent-table-resize-column-24-regular cursor-pointer icon-btn />
    </div>

    <div flex-y-center gap-2>
      <Meta2dFileDropdown />
      <div>
        缩略图
      </div>
      <div>
        放大镜
      </div>
      <div>
        预览
      </div>
      <div>
        快捷键
      </div>
      <div>
        设置
      </div>

      <Meta2dShowProps :="$attrs" />

      <a-divider direction="vertical" />

      <div cursor-pointer hover:text-primary @click="clear">
        清空图纸
      </div>
      <div>
        保存
      </div>
    </div>
  </div>
</template>
