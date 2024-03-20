import type { Component } from 'vue'
import {
  IconDesktop,
  IconFile,
  IconHome,
  IconIdcard,
  IconUser,
} from '@arco-design/web-vue/es/icon'
import IconUserProfile from '~icons/carbon/user-profile'
import IconApplication from '~icons/carbon/application'

export const MENU_ICON_MAP: { [key: string]: Component } = {
  home: IconHome,
  system: IconDesktop,
  user: IconUser,
  role: IconIdcard,
  file: IconFile,
  profile: IconUserProfile,
  componentManage: IconApplication,
  meta2d: IconApplication,
}
