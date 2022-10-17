import { createApp } from 'vue'
import App from './App.vue'
import Router from '@/router'
import pluginsRegister from '@/global'
import store from '@/store/index'
// import service from '@/service'
import 'normalize.css'
import '@/assets/css/index.less'
// interface responseDataType {
//   code: number
//   message: string
//   data: any
// }
// 发送请求
// service
//   .request<responseDataType>({
//     url: '/role/getRole',
//     interceptors: {}
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

const app = createApp(App)
app.use(Router)
app.use(pluginsRegister)
app.use(store)
app.mount('#app')
