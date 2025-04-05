<script lang="ts" setup>
import HTTPRequest from '@/utils/HTTPRequest'
import { toast } from 'vue-sonner'

const props = defineProps<{
  modelValue: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref(props.modelValue ? import.meta.env.VITE_REQUEST_BASE_URL + props.modelValue : '')
const isUploading = ref(false)

async function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0)
    return

  const file = target.files[0]

  // 检查文件类型
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
  if (!allowedTypes.includes(file.type)) {
    toast.error('请上传JPG或PNG格式的图片')
    return
  }

  // 检查文件大小（10MB = 10 * 1024 * 1024 bytes）
  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    toast.error('文件大小不能超过10MB')
    return
  }

  try {
    isUploading.value = true

    // 创建FormData对象用于文件上传
    const formData = new FormData()
    formData.append('file', file)

    // 使用HTTPRequest调用后端API上传文件
    const response = await HTTPRequest<{ filename: string, path: string }>({
      url: '/upload/image',
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    // 从响应中获取文件URL
    if (response.code === 200 && response.data) {
      toast.success('上传成功')
      const uploadPath = `/${response.data.path}${response.data.filename}`
      // 创建本地预览
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target) {
          previewUrl.value = e.target.result as string
          emit('update:modelValue', uploadPath)
        }
      }
      reader.readAsDataURL(file)
    }
    else {
      throw new Error(response.message || '上传失败')
    }
  }
  catch (error) {
    console.error('上传失败', error)
    toast.error('上传失败, 请重试')
  }
  finally {
    isUploading.value = false
  }
}

function triggerFileInput() {
  if (props.disabled)
    return
  fileInput.value?.click()
}
</script>

<template>
  <div class="relative">
    <div
      class="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden"
      :class="{ 'opacity-50': disabled, 'hover:border-primary': !disabled }"
      @click="triggerFileInput"
    >
      <img v-if="previewUrl" :src="previewUrl" alt="Avatar" class="w-full h-full object-cover">
      <div v-else class="text-center text-gray-500">
        <div class="i-lucide-upload text-2xl mb-1" />
        <div class="text-xs">
          上传头像
        </div>
      </div>
      <Skeleton v-if="isUploading" class="absolute w-24 h-24 rounded-full inset-0 flex items-center justify-center text-white">
        Uploading...
      </Skeleton>
    </div>
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="hidden"
      :disabled="disabled"
      @change="handleFileChange"
    >
  </div>
</template>
