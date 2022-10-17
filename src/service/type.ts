export interface apiDataType<T> {
  code: number
  message: string
  error: number
  data: T
}
