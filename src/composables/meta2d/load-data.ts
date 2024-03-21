export function loadMeta2dData() {
  // 读取本地存储
  let data: any = localStorage.getItem('meta2d')
  if (data) {
    data = JSON.parse(data)

    // 判断是否为运行查看，是-设置为预览模式
    if (location.pathname === '/preview') {
      data.locked = 1
    } else {
      data.locked = 0
    }
    meta2d.open(data)
  }

  const pens = [
    {
      id: '101',
      name: 'rectangle',
      text: '矩形',
      x: 100,
      y: 100,
      width: 100,
      height: 100,
    },
    // {
    //   width: 120,
    //   height: 80,
    //   x: 400,
    //   y: 100,
    //   image: equipImage2,
    //   name: 'image',
    // },
  ]
  meta2d.addPens(pens)

  // useIntervalFn(() => {
  //   meta2d.setValue({
  //     id: '101',
  //     text: `${getRandomInteger(100)}V`,
  //   })
  // }, 50)
}
