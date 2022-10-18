enum storageType {
  SESSION_STORAG = 'sessionStorage',
  LOCAL_STORAGE = 'localStorage'
}
/**
 * @description 将数据缓存到本地-->类封装
 */
class StorageCache {
  readonly story: string
  constructor(type: storageType) {
    this.story = type
  }
  /**
   * @description 存储数据
   * @param key 要存的key
   * @param value 要存的值
   * @param type 存储类型(0-sessionStorage,1-localStorage)
   */
  setCache(key: string, value: any) {
    window[this.story as storageType].setItem(key, JSON.stringify(value))
  }
  getCache(key: string) {
    let value: any
    value = window[this.story as storageType].getItem(key)
    return value && JSON.parse(value)
  }
  removeCache(key: string) {
    window[this.story as storageType].removeItem(key)
  }
  clearCache() {
    window[this.story as storageType].clear()
  }
}
export default new StorageCache(storageType.LOCAL_STORAGE)
