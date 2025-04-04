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
const isUploading = ref(false)
const fileName = ref('')

async function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0)
    return

  const file = target.files[0]

  // 检查文件类型
  const allowedTypes = ['video/mp4']
  if (!allowedTypes.includes(file.type)) {
    toast.error('请上传MP4格式的视频')
    return
  }

  // 检查文件大小（100MB = 100 * 1024 * 1024 bytes）
  const maxSize = 100 * 1024 * 1024 // 100MB
  if (file.size > maxSize) {
    toast.error('文件大小不能超过100MB')
    return
  }

  try {
    isUploading.value = true
    fileName.value = file.name

    // 创建FormData对象用于文件上传
    const formData = new FormData()
    formData.append('file', file)

    // 使用HTTPRequest调用后端API上传文件
    const response = await HTTPRequest<string>({
      url: '/file/uploadVideo',
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    // 从响应中获取文件URL
    if (response.code === 200 && response.data) {
      toast.success('上传成功')
      const uploadPath = response.data
      emit('update:modelValue', uploadPath)
    }
    else {
      throw new Error(response.message || '上传失败')
    }
  }
  catch (error) {
    console.error('上传失败', error)
    toast.error('上传失败, 请重试')
    fileName.value = ''
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
      class="w-full h-24 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden"
      :class="{ 'opacity-50': disabled, 'hover:border-primary': !disabled }"
      @click="triggerFileInput"
    >
      <div v-if="fileName" class="text-center text-gray-700">
        <div class="i-lucide-video text-2xl mb-1" />
        <div class="text-sm truncate max-w-xs">
          {{ fileName }}
        </div>
      </div>
      <div v-else class="text-center text-gray-500">
        <div class="i-lucide-upload text-2xl mb-1" />
        <div class="text-sm">
          上传视频 (MP4格式)
        </div>
      </div>
      <Skeleton v-if="isUploading" class="absolute w-full h-24 rounded-md inset-0 flex items-center justify-center text-white">
        上传中...
      </Skeleton>
    </div>
    <input
      ref="fileInput"
      type="file"
      accept="video/mp4"
      class="hidden"
      :disabled="disabled"
      @change="handleFileChange"
    >
  </div>
</template>
