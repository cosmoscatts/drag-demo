export function changeMeta2dColor() {
  meta2d.setGrid({
    gridColor: defaultMeta2dGridColor.value,
  })
  Object.values(meta2d.store.pens).forEach((pen) => {
    meta2d.setValue({
      id: pen?.id,
      color: isDark.value ? '#F6F6F6' : '#1D2129',
    })
  })
  meta2d.render()
}
