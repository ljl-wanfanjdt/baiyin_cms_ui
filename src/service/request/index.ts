/**
 * @description 二次封装axios
 */

import axios from 'axios'
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// 创建拦截器接口类型
interface ByRequestInterceptors<T = AxiosResponse> {
  // 成功的请求拦截器属性,类型为回调函数
  requestInterceptorFulfilled?: (
    config: AxiosRequestConfig
  ) => AxiosRequestConfig

  // 失败的请求拦截器属性
  requestInterceptorReject?: (error: any) => any

  //成功的响应拦截器属性,类型为回调函数
  responseInterceptorFulfilled?: (value: T) => T

  // 失败的响应拦截器属性
  responseInterceptorReject?: (error: any) => any
}

interface ByRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ByRequestInterceptors<T>
}

// 封装一个请求类 如果不用axios只需要修改这个类即可,解耦程序对axios的依赖
class ByRequest {
  instance: AxiosInstance
  interceptors?: ByRequestInterceptors
  constructor(config: ByRequestConfig) {
    /*
      创建一个axios实例,其实axios.create返回的一个函数对象,功能上是axios实例,本质不是
      (源码中是新建的一个request函数,继承了axios prototype上的方法,以及实例上的属性)
    */
    this.instance = axios.create(config)

    // 保存基本配置
    this.interceptors = config.interceptors

    // 注册实例维度的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptorFulfilled,
      this.interceptors?.requestInterceptorReject
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptorFulfilled,
      this.interceptors?.responseInterceptorReject
    )

    /*
      注册全局(类)维度的拦截器,所有实例都有
      (请求拦截器后绑定的先执行,响应拦截器先绑定的先执行)
    */
    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局,所有实例都有的请求拦截器--成功')
        return config
      },
      (error) => {
        console.log('全局,所有实例都有的请求拦截器--失败')
        throw error
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('全局,所有实例都有的响应拦截器--成功')
        return res.data
      },
      (error) => {
        console.log('全局,所有实例都有的响应拦截器--失败')
        throw error
      }
    )
  }
  request<T>(config: ByRequestConfig<T>): Promise<T> {
    // 单个请求拦截器处理
    return new Promise<T>((resolve, reject) => {
      if (config.interceptors?.requestInterceptorFulfilled) {
        config = config.interceptors.requestInterceptorFulfilled(config)
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个响应拦截器处理
          if (config.interceptors?.responseInterceptorFulfilled) {
            res = config.interceptors.responseInterceptorFulfilled(res)
          }
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  post<T>(config: ByRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  get<T>(config: ByRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  delete<T>(config: ByRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  put<T>(config: ByRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }
  patch<T>(config: ByRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default ByRequest

export { ByRequestConfig }
