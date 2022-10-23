<template>
  <div>
    <label for="upload">上传文件: </label>
    <input
      type="file"
      id="upload"
      ref="uploadRefs"
      @change="handleFileChange"
    />
    <el-upload
      :auto-upload="false"
      :before-upload="beforeUpload"
      :on-change="onChange"
    >
      <template #trigger>
        <el-button type="primary">select file</el-button>
      </template>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div>
      </template>
    </el-upload>
    <el-button>error</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import type { UploadFile, UploadFiles } from 'element-plus'
import { ref } from 'vue'
import { converImageToBase64, compressImage } from '@/utils/index'
const ACCEPT = ['image/jpg', 'image/png', 'image/jpeg']
const MAXSIZE = 3 * 1024 * 1024
const uploadRefs = ref(null)
const formData = new FormData()
// 文件改变
const handleFileChange = (e: Event) => {
  // 获取上传文件信息
  const [file] = (e.target as HTMLInputElement).files!
  if (!file) {
    return
  }
  const { type: fileType, size: fileSize } = file

  // 格式判断
  if (!ACCEPT.includes(fileType)) {
    ElMessage.error(`不支持此文件格式${fileType}`)
    ;(uploadRefs as unknown as HTMLInputElement).value = ''
    return
  }

  // 大小判断
  if (fileSize > MAXSIZE) {
    ElMessage.error(`文件大小超过最大值${MAXSIZE},会被进行压缩`)
    // 压缩图片
    converImageToBase64(file, (base64Image: string) =>
      compressImage(base64Image)
    ).then((value) => {
      console.log(value)
    })
  }
}

// 上传文件之前的钩子
const beforeUpload = (e: any) => {
  console.log(e)
}

const onChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log(uploadFile.raw)
  formData.append('file', uploadFile.raw!)
  formData.append('filename', uploadFile.name)
}
</script>
<style lang="less" scoped></style>
