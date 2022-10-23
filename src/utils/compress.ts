// type base64ImageType = string

// 图片转base64
export function converImageToBase64(
  file: File,
  callback?: (base64Image: string) => Promise<string>
) {
  return new Promise<string>((resolve, reject) => {
    let reader: FileReader | null = new FileReader()
    // 读取对象,读取完result会包含一个base64
    reader.readAsDataURL(file)
    reader.addEventListener('load', async (e: Event) => {
      const base64Image = (e.target as FileReader).result
      if (callback) {
        try {
          const result = await callback(base64Image!.toString())
          result && resolve(result)
        } catch (error) {
          reject(error)
        }
      }
      resolve(base64Image!.toString())
    })
    reader = null
  })
}

// 压缩图片处理
export function compressImage(base64Image: string) {
  return new Promise<string>((resolve, reject) => {
    let maxW = 1024
    let maxH = 1024
    const image = new Image()
    image.src = base64Image ?? ''

    // 图片加载完成
    image.addEventListener('load', () => {
      // 图片的压缩比
      let ratio
      // 是否需要压缩
      let needCompress = false
      if (maxW < image.naturalWidth) {
        needCompress = true
        ratio = image.naturalWidth / maxW
        maxH = image.naturalHeight / ratio
      }
      if (maxH < image.naturalHeight) {
        needCompress = true
        ratio = image.naturalHeight / maxH
        maxW = image.naturalWidth / ratio
      }
      // 如果不需要压缩，需要获取图片的实际尺寸
      if (!needCompress) {
        maxW = image.naturalWidth
        maxH = image.naturalHeight
      }
      console.log(ratio)

      // 创建canvas
      const canvas = document.createElement('canvas')
      canvas.setAttribute('id', '__compress__')
      canvas.width = maxW
      canvas.height = maxH
      canvas.style.visibility = 'hidden'
      const ctx = canvas.getContext('2d')
      ctx?.clearRect(0, 0, maxW, maxH)
      ctx?.drawImage(image, 0, 0, maxW, maxH)

      // 输出绘制后的base
      const compressImage = canvas.toDataURL('image/jpeg', 1)
      if (compressImage) {
        resolve(compressImage)
      }
      reject('压缩失败')
      canvas.remove()
    })
  })

  // image.setAttribute('style', 'width:100px;height:100px')
  // // 插入图片
  // document.querySelector('.layout-main')?.appendChild(image)
}
