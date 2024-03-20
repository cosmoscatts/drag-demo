<script setup lang="ts">
import type { TreeNodeData } from '@arco-design/web-vue'
import ComponentManageTree from './components/ComponentManageTree.vue'
import ComponentManageTool from './components/ComponentManageTool.vue'
import { data } from './tree'
import { LAYOUT_PARAMS as params } from '~/constants'

const contentHeight = computed(() => {
  return `calc(100vh - ${getLayoutContentHeight().value + params.contentPadding * 2}px)`
})

const treeData = ref<TreeNodeData[]>(data)

interface Data {
  id: string
  x: number
  y: number
  w: number | string
  h: number | string
  scale: number
  z: number
  draggable: boolean
  resizable: boolean

  text?: string
  points?: string[]
  pointTitle?: string
}

const DEFAULT_PARAMS = {
  EQUIP: {
    W: 300,
    H: 150,
  },
  ARROW: {
    W: 30,
    H: 50,
  },
  TEXT: {
    W: 150,
    H: 60,
  },
  POINT: {
    W: 130,
    H: 100,
  },
}

const equips = ref<Data[]>([])
const points = ref<Data[]>([])
const arrows = ref<Data[]>([])
const texts = ref<Data[]>([])

function createData() {
  equips.value = [
    { id: 'equip1', x: 10, y: 110, w: DEFAULT_PARAMS.EQUIP.W, h: DEFAULT_PARAMS.EQUIP.H, z: 0, scale: 1, draggable: true, resizable: true },
    { id: 'equip2', x: 380, y: 110, w: DEFAULT_PARAMS.EQUIP.W, h: DEFAULT_PARAMS.EQUIP.H, z: 0, scale: 1, draggable: true, resizable: true },
  ]

  points.value = [
    { id: 'point1', x: 20, y: 310, w: DEFAULT_PARAMS.POINT.W, h: DEFAULT_PARAMS.POINT.H, z: 0, scale: 1, draggable: true, resizable: true, points: ['speed', 'acceleration', 'temperature'], pointTitle: '电机驱动端1V' },
    { id: 'point2', x: 170, y: 310, w: DEFAULT_PARAMS.POINT.W, h: DEFAULT_PARAMS.POINT.H, z: 0, scale: 1, draggable: true, resizable: true, points: ['speed', 'acceleration', 'temperature'], pointTitle: '泵自由端3H' },
    { id: 'point3', x: 390, y: 310, w: DEFAULT_PARAMS.POINT.W, h: DEFAULT_PARAMS.POINT.H, z: 0, scale: 1, draggable: true, resizable: true, points: ['speed', 'acceleration', 'temperature'], pointTitle: '电机驱动端1V' },
    { id: 'point4', x: 540, y: 310, w: DEFAULT_PARAMS.POINT.W, h: DEFAULT_PARAMS.POINT.H, z: 0, scale: 1, draggable: true, resizable: true, points: ['speed', 'acceleration', 'temperature'], pointTitle: '泵自由端3H' },
  ]

  texts.value = [
    { id: 'text1', x: 80, y: 40, w: DEFAULT_PARAMS.TEXT.W, h: DEFAULT_PARAMS.TEXT.H, z: 0, scale: 1, draggable: true, resizable: true, text: '6泵房 1#泵' },
    { id: 'text2', x: 460, y: 40, w: DEFAULT_PARAMS.TEXT.W, h: DEFAULT_PARAMS.TEXT.H, z: 0, scale: 1, draggable: true, resizable: true, text: '6泵房 2#泵' },
  ]

  arrows.value = [
    { id: 'arrow1', x: 60, y: 250, w: DEFAULT_PARAMS.ARROW.W, h: DEFAULT_PARAMS.ARROW.H, z: 0, scale: 1, draggable: true, resizable: true },
    { id: 'arrow2', x: 220, y: 250, w: DEFAULT_PARAMS.ARROW.W, h: DEFAULT_PARAMS.ARROW.H, z: 0, scale: 1, draggable: true, resizable: true },
    { id: 'arrow3', x: 440, y: 250, w: DEFAULT_PARAMS.ARROW.W, h: DEFAULT_PARAMS.ARROW.H, z: 0, scale: 1, draggable: true, resizable: true },
    { id: 'arrow4', x: 590, y: 250, w: DEFAULT_PARAMS.ARROW.W, h: DEFAULT_PARAMS.ARROW.H, z: 0, scale: 1, draggable: true, resizable: true },
  ]
}

// createData()

const refContainter = ref(null)
const { width, height } = useElementSize(refContainter)
const { left, top } = useElementBounding(refContainter)

function getRandomWidth() {
  return getRandomInteger(width.value)
}
function getRandomHeight() {
  return getRandomInteger(height.value)
}

function addEquip(x = getRandomWidth(), y = getRandomHeight()) {
  equips.value = [
    ...equips.value,
    { id: getRandomStr(6), x, y, w: DEFAULT_PARAMS.EQUIP.W, h: DEFAULT_PARAMS.EQUIP.H, z: 0, scale: 1, draggable: true, resizable: true },
  ]
}

function addPoint(x = getRandomWidth(), y = getRandomHeight()) {
  points.value = [
    ...points.value,
    { id: getRandomStr(6), x, y, w: DEFAULT_PARAMS.POINT.W, h: DEFAULT_PARAMS.POINT.H, z: 0, scale: 1, draggable: true, resizable: true, points: ['speed', 'acceleration', 'temperature'], pointTitle: '电机驱动端1V' },
  ]
}

function addText(x = getRandomWidth(), y = getRandomHeight()) {
  texts.value = [
    ...texts.value,
    { id: getRandomStr(6), x, y, w: DEFAULT_PARAMS.TEXT.W, h: DEFAULT_PARAMS.TEXT.H, z: 0, scale: 1, draggable: true, resizable: true, text: '6泵房 2#泵' },
  ]
}

function addArrow(x = getRandomWidth(), y = getRandomHeight()) {
  arrows.value = [
    ...arrows.value,
    { id: getRandomStr(6), x, y, w: DEFAULT_PARAMS.ARROW.W, h: DEFAULT_PARAMS.ARROW.H, z: 0, scale: 1, draggable: true, resizable: true },

  ]
}

provide('addEquip', addEquip)
provide('addPoint', addPoint)
provide('addText', addText)
provide('addArrow', addArrow)
</script>

<template>
  <div grid="~ cols-7 gap-2" :style="{ minHeight: contentHeight }">
    <div col-span-1 h-full border="1 base" p-10px>
      <ComponentManageTree :tree-data="treeData" />
    </div>
    <div col-span-5 h-full border="1 base">
      <DragBg ref="refContainter">
        <DragEquip
          v-for="equip in equips"
          :id="equip.id"
          :key="equip.id"
          v-model:x="equip.x"
          v-model:y="equip.y"
          v-model:w="equip.w"
          v-model:h="equip.h"
          :scale="equip.scale"
          :z="equip.z"
          :draggable="equip.draggable"
          :resizable="equip.resizable"
        />

        <DragText
          v-for="text in texts"
          :id="text.id"
          :key="text.id"
          v-model:x="text.x"
          v-model:y="text.y"
          v-model:w="text.w"
          v-model:h="text.h"
          :text="text.text"
          :scale="text.scale"
          :z="text.z"
          :draggable="text.draggable"
          :resizable="text.resizable"
        />

        <DragPoint
          v-for="point in points"
          :id="point.id"
          :key="point.id"
          v-model:x="point.x"
          v-model:y="point.y"
          v-model:w="point.w"
          v-model:h="point.h"
          :scale="point.scale"
          :z="point.z"
          :draggable="point.draggable"
          :resizable="point.resizable"
          :points="point.points"
          :point-title="point.pointTitle"
        />

        <DragArrow
          v-for="arrow in arrows"
          :id="arrow.id"
          :key="arrow.id"
          v-model:x="arrow.x"
          v-model:y="arrow.y"
          v-model:w="arrow.w"
          v-model:h="arrow.h"
          :scale="arrow.scale"
          :z="arrow.z"
          :draggable="arrow.draggable"
          :resizable="arrow.resizable"
        />
      </DragBg>
    </div>
    <div col-span-1 h-full border="1 base">
      <ComponentManageTool :left="left" :top="top" />
    </div>
  </div>
</template>
