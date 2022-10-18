import ByRequest from './request'
import cache from '@/utils/cache'
const service = new ByRequest({
  baseURL: '/api',
  timeout: 10000,
  interceptors: {
    requestInterceptorFulfilled(config) {
      // console.log('实例自身请求拦截器--成功')
      /*
        在本地缓存中获取token
        不在vuex中获取,因为vuex刷新状态丢失,当然也可以在刷新时将缓存中数据赋给vuex,但是多了一步,较为繁琐
      */
      const token = cache.getCache('token')
      if (token) {
        config.headers = {
          authorization: `Bearer ${token}`
        }
      }
      return config
    },
    requestInterceptorReject(error) {
      throw error
    },
    responseInterceptorFulfilled(value) {
      console.log('实例自身响应拦截器--成功')
      return value
    },
    responseInterceptorReject(error) {
      throw error
    }
  }
})
export default service
