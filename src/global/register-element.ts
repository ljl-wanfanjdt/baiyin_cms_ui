/**
 * @description 按需导入elementui组件
 */
import type { App } from 'vue'
import {
  UserFilled,
  Lock,
  HomeFilled,
  Fold,
  Expand,
  Setting
} from '@element-plus/icons-vue'

const elementComponents = [UserFilled, Lock, HomeFilled, Fold, Expand, Setting]

export default function (app: App) {
  elementComponents.forEach((itemEl) => {
    app.component(itemEl.name, itemEl)
  })
}
