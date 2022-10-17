/**
 * @description 按需导入elementui组件
 */
import type { App } from 'vue'
import { ElButton } from 'element-plus'

const elementComponents = [ElButton]

export default function (app: App) {
  elementComponents.forEach((itemEl) => {
    app.component(itemEl.name, itemEl)
  })
}
