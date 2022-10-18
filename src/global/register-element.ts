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
  Setting,
  ArrowDown,
  CircleClose
} from '@element-plus/icons-vue'

const elementComponents = [
  UserFilled,
  Lock,
  HomeFilled,
  Fold,
  Expand,
  Setting,
  ArrowDown,
  CircleClose
]

export default function (app: App) {
  elementComponents.forEach((itemEl) => {
    app.component(itemEl.name, itemEl)
  })
}
