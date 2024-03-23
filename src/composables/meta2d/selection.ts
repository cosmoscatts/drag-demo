import type { Pen } from '@meta2d/core'

export enum SelectionMode {
  File,
  Pen,
}

const selections = reactive<{
  mode: SelectionMode
  pen?: Pen
  pens?: Pen[]
}>({
  // 选中对象类型：0 - 画布；1 - 单个图元
  mode: SelectionMode.File,
  pen: undefined,
  pens: [],
})

export function useMeta2dSelection() {
  const select = (pens?: Pen[]) => {
    if (!pens || pens.length !== 1) {
      selections.mode = SelectionMode.File
      selections.pen = undefined

      if (pens?.length)
        selections.pens = pens
      else
        selections.pens = []
      return
    }

    selections.mode = SelectionMode.Pen
    selections.pen = pens[0]
    selections.pens = pens
  }
  return {
    selections,
    select,
  }
}
