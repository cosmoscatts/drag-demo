<script setup lang="ts">
import type { Position } from '@vueuse/core'

const props = defineProps<{
  left?: number
  top?: number
}>()

const addEquip = inject('addEquip') as (x?: number, y?: number) => void
const addPoint = inject('addPoint') as (x?: number, y?: number) => void
const addText = inject('addText') as (x?: number, y?: number) => void
const addArrow = inject('addArrow') as (x?: number, y?: number) => void

const refAddEquip = ref()
// const { top: addEquipTop, left: addEquipLeft } = useElementBounding(refAddEquip)
const refAddEquipCopy = ref()
// const { x: addEquipCopyX, y: addEquipCopyY } =
useDraggable(refAddEquipCopy, {
  preventDefault: true,
  stopPropagation: true,
  onEnd({ x, y }: Position) {
    const rectX = Math.max(0, x - (props?.left || 0))
    const rectY = Math.max(0, y - (props?.top || 0))
    addEquip(rectX, rectY)
    // addEquipCopyX.value = addEquipLeft.value
    // addEquipCopyY.value = addEquipTop.value
  },
})

const refAddPoint = ref()
const refAddPointCopy = ref()
useDraggable(refAddPointCopy, {
  preventDefault: true,
  stopPropagation: true,
  onEnd({ x, y }: Position) {
    const rectX = Math.max(0, x - (props?.left || 0))
    const rectY = Math.max(0, y - (props?.top || 0))
    addPoint(rectX, rectY)
  },
})

const refAddText = ref()
const refAddTextCopy = ref()
useDraggable(refAddTextCopy, {
  preventDefault: true,
  stopPropagation: true,
  onEnd({ x, y }: Position) {
    const rectX = Math.max(0, x - (props?.left || 0))
    const rectY = Math.max(0, y - (props?.top || 0))
    addText(rectX, rectY)
  },
})

const refAddArrow = ref()
const refAddArrowCopy = ref()
useDraggable(refAddArrowCopy, {
  preventDefault: true,
  stopPropagation: true,
  onEnd({ x, y }: Position) {
    const rectX = Math.max(0, x - (props?.left || 0))
    const rectY = Math.max(0, y - (props?.top || 0))
    addArrow(rectX, rectY)
  },
})
</script>

<template>
  <div flex="~ col" h-full w-full gap-4 p-10px>
    <div flex-center gap-3 text-primary>
      <div i-carbon-tools />
      工具栏
    </div>

    <div grid="~ cols-2 gap-2">
      <div col-span-1>
        <div min-h-50px w-full flex-center border="1 base" hover:bg="gray/10" rounded focus:bg="gray/10">
          <div ref="refAddEquip" i-ri-device-line relative text-36px op-40>
            <div ref="refAddEquipCopy" i-ri-device-line absolute left-0 top-0 z-100 text-36px op-40 />
          </div>
        </div>
      </div>
      <div col-span-1>
        <div min-h-50px w-full flex-center border="1 base" hover:bg="gray/10" rounded focus:bg="gray/10">
          <div ref="refAddPoint" i-ri-artboard-2-line relative text-36px op-40>
            <div ref="refAddPointCopy" i-ri-artboard-2-line absolute left-0 top-0 z-100 text-36px op-40 />
          </div>
        </div>
      </div>
      <div col-span-1>
        <div min-h-50px w-full flex-center border="1 base" hover:bg="gray/10" rounded focus:bg="gray/10">
          <div ref="refAddArrow" i-mdi-arrow-down-bold-outline relative text-36px op-40>
            <div ref="refAddArrowCopy" i-mdi-arrow-down-bold-outline absolute left-0 top-0 z-100 text-36px op-40 />
          </div>
        </div>
      </div>
      <div col-span-1>
        <div min-h-50px w-full flex-center border="1 base" hover:bg="gray/10" rounded focus:bg="gray/10">
          <div ref="refAddText" i-ri-text relative text-36px op-40>
            <div ref="refAddTextCopy" i-ri-text absolute left-0 top-0 z-100 text-36px op-40 />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
