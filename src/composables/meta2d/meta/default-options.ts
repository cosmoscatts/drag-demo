export const defaultMeta2dGridColor = computed(() => isDark.value ? '#484849' : '#E5E6EB')

export const defaultMeta2dOptions: any = {
  rule: true, // 是否开启标尺
  disableScale: true,
  gridColor: defaultMeta2dGridColor.value,
  grid: true, // 背景网格,
  gridSize: 10,
}
