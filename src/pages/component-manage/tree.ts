import type { TreeNodeData } from '@arco-design/web-vue'

export const data = [
  {
    key: '1',
    title: '宝武碳业科技股份有限公司',
    children: [
      {
        key: '101',
        title: '梅山分公司',
        children: [
          {
            key: '10101',
            title: '简智达作业线',
          },
        ],
      },
    ],
  },
  {
    key: '2',
    title: '金川动力厂',
    children: [
      {
        key: '201',
        title: '6号泵站',
      },
      {
        key: '202',
        title: '7号泵站',
      },
    ],
  },
] as TreeNodeData[]
