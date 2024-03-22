<script setup lang="ts">
const refEl = ref()

function close() {

}

// const isPens = ref(false)
// const ctxMenu = ref()
// let activePens = []

// const menuPos = reactive({
//   top: -9999,
//   left: -9999,
//   visible: false,
// })

// const calcMenuPos = computed(() => {
//   return {
//     top: `${menuPos.top}px`,
//     left: `${menuPos.left}px`,
//     visible: menuPos.visible ? 'visible' : 'hidden',
//   }
// })

// const eventBus = useEventbus()
// eventBus.customOn('load', () => {
//   window.addEventListener('contextmenu', (e) => {
//     e.preventDefault()
//     ctxMenu.value.focus()
//   })
//   meta2d.on('contextmenu', ({ e }) => {
//     menuPos.top = e.clientY
//     menuPos.left = e.clientX
//     menuPos.visible = true
//     ctxMenu.value.focus()
//   })
//   meta2d.on('active', (pens) => {
//     if (pens.length > 0) {
//       activePens = reactive(pens)
//       isPens.value = true
//     } else {
//       isPens.value = false
//       activePens = []
//     }
//   })
//   meta2d.on('inactive', () => {
//     isPens.value = false
//   })
// })

function redo() {
  if (!meta2d) return
  meta2d.redo()
}

function undo() {
  if (!meta2d) return
  meta2d.undo()
}

function lock() {
  meta2d.lock(2)
}

function combine() {

}

function cut() {
  meta2d.cut()
}

function copy() {

}

function paste() {

}
</script>

<template>
  <a-dropdown trigger="contextMenu" align-point w-180px :popup-max-height="350">
    <slot />
    <template #content>
      <a-doption>置顶</a-doption>
      <a-doption>置底</a-doption>
      <a-doption>上一个图层</a-doption>
      <a-doption>下一个图层</a-doption>

      <div my-2px border-t-1 border-base />

      <a-doption>锁定</a-doption>
      <a-doption>组合 / 取消组合</a-doption>

      <div my-2px border-t-1 border-base />

      <a-doption>删除</a-doption>

      <div my-2px border-t-1 border-base />

      <a-doption :style="{ width: '100%' }">
        <div w-full flex-y-center justify-between>
          <div>撤销</div>
          <div>Ctrl + Z</div>
        </div>
      </a-doption>
      <a-doption>
        <div flex-y-center justify-between>
          <div>重做</div>
          <div>Shift + Z</div>
        </div>
      </a-doption>

      <div my-2px border-t-1 border-base />

      <a-doption>
        <div flex-y-center justify-between>
          <div>剪切</div>
          <div>Ctrl + X</div>
        </div>
      </a-doption>
      <a-doption>
        <div flex-y-center justify-between>
          <div>复制</div>
          <div>Ctrl + C</div>
        </div>
      </a-doption>
      <a-doption>
        <div flex-y-center justify-between>
          <div>粘贴</div>
          <div>Ctrl + V</div>
        </div>
      </a-doption>
    </template>
  </a-dropdown>
</template>

<style scoped>
:deep(.arco-dropdown-option-content) {
  width: 100%;
}
</style>
