import ByRequest from './request'

const service = new ByRequest({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    authorization:
      'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInVzZXJOYW1lIjoi5YiY6YeR5Lqu55qE5a6d6JuLIiwiaWF0IjoxNjYwMzg0MTAzLCJleHAiOjE2NjA0NzA1MDN9.HOl737_It7ehz_ORFeL8-e0iaHIYUU5uzXxU5-W1NbJFAk5x7gikiY8h5irZsWAuJ0he8AOS52jGpMqOEgqAuRPqBJ35C0Z8Dyev4U7nIcBukq6KrRFJ9EInvMA0JrYZP7F8cbi_hMJIlXY2t7ND5foCbe4lFcFOpGIEVpTa4Qo'
  },
  interceptors: {
    requestInterceptorFulfilled(config) {
      console.log('实例自身请求拦截器--成功')

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
