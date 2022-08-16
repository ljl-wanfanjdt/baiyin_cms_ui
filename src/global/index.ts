import type { App } from 'vue'
import registerElement from './register-element'
const registerPlugin = {
  install(app: App) {
    registerElement(app)
  }
}

export default registerPlugin
