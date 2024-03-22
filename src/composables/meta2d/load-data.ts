export function loadMeta2dData() {
  // 读取本地存储
  let data: any = localStorage.getItem('meta2d')

  if (!data) return

  data = JSON.parse(data)
  data.locked = 0
  meta2d.open(data)
}
