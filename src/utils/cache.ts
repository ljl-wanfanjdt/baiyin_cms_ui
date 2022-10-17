enum storageType {
  SESSION_STORAGE,
  LOCAL_STORAGE
}
/**
 * @description 将数据缓存到本地-->类封装
 */
class StorageCache {
  /**
   * @description 存储数据
   * @param key 要存的key
   * @param value 要存的值
   * @param type 存储类型(0-sessionStorage,1-localStorage)
   */
  setCache(key: string, value: any, type: storageType) {
    switch (type) {
      case storageType.LOCAL_STORAGE:
        window.localStorage.setItem(key, JSON.stringify(value))
        break
      case storageType.SESSION_STORAGE:
        window.sessionStorage.setItem(key, JSON.stringify(value))
        break
      default:
        break
    }
  }
  getCache(key: string, type: storageType) {
    let value: any
    switch (type) {
      case storageType.LOCAL_STORAGE:
        value = window.localStorage.getItem(key)
        return value && JSON.parse(value)
      case storageType.SESSION_STORAGE:
        value = window.sessionStorage.getItem(key)
        return value && JSON.parse(value)
      default:
        break
    }
  }
  removeCache(key: string, type: storageType) {
    switch (type) {
      case storageType.LOCAL_STORAGE:
        window.localStorage.removeItem(key)
        break
      case storageType.SESSION_STORAGE:
        window.sessionStorage.removeItem(key)
        break
      default:
        break
    }
  }
  clearCache(type: storageType) {
    switch (type) {
      case storageType.LOCAL_STORAGE:
        window.localStorage.clear()
        break
      case storageType.SESSION_STORAGE:
        window.sessionStorage.clear()
        break
      default:
        // const foo: never = type
        break
    }
  }
}
export default new StorageCache()
