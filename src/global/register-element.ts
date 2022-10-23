/**
 * @description 按需导入elementui组件
 */
import type { App } from 'vue'
import 'element-plus/dist/index.css'
import {
  UserFilled,
  Lock,
  HomeFilled,
  Fold,
  Expand,
  Setting,
  ArrowDown,
  CircleClose,
  Grid
} from '@element-plus/icons-vue'
import { ElInput } from 'element-plus'
const elementComponents = [
  UserFilled,
  Lock,
  HomeFilled,
  Fold,
  Expand,
  Setting,
  ArrowDown,
  CircleClose,
  Grid,
  ElInput
]

export default function (app: App) {
  elementComponents.forEach((itemEl) => {
    app.component(itemEl.name, itemEl)
  })
}
