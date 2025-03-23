<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { cn } from '@/utils'
import HTTPRequest from '@/utils/HTTPRequest'
import { AlertCircle, CheckCircle2, FileIcon, Upload, X } from 'lucide-vue-next'
import { computed, ref } from 'vue'

interface FileUploadProps {
  url: string
  accept?: string
  multiple?: boolean
  maxSize?: number // 单位MB
  class?: string
  onSuccess?: (response: any) => void
  onError?: (error: any) => void
}

const props = withDefaults(defineProps<FileUploadProps>(), {
  accept: '*',
  multiple: false,
  maxSize: 10, // 默认最大10MB
})

const emits = defineEmits<{
  (e: 'success', response: any): void
  (e: 'error', error: any): void
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const files = ref<File[]>([])
const uploading = ref(false)
const uploadProgress = ref(0)
const uploadStatus = ref<'idle' | 'uploading' | 'success' | 'error'>('idle')
const errorMessage = ref('')

// 计算文件大小的可读格式
function formatFileSize(bytes: number): string {
  if (bytes === 0)
    return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
}

// 检查文件大小是否超过限制
function isFileSizeValid(file: File): boolean {
  const maxSizeBytes = props.maxSize * 1024 * 1024
  return file.size <= maxSizeBytes
}

// 处理文件选择
function handleFileSelect(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files) {
    handleFiles(Array.from(input.files))
  }
}

// 处理文件拖放
function handleDrop(event: DragEvent) {
  event.preventDefault()
  isDragging.value = false

  if (event.dataTransfer?.files) {
    handleFiles(Array.from(event.dataTransfer.files))
  }
}

// 处理文件
function handleFiles(newFiles: File[]) {
  // 重置状态
  uploadStatus.value = 'idle'
  errorMessage.value = ''

  // 检查文件大小
  const invalidFiles = newFiles.filter(file => !isFileSizeValid(file))
  if (invalidFiles.length > 0) {
    uploadStatus.value = 'error'
    errorMessage.value = `文件大小超过限制 (${props.maxSize}MB): ${invalidFiles.map(f => f.name).join(', ')}`
    return
  }

  // 更新文件列表
  if (props.multiple) {
    files.value = [...files.value, ...newFiles]
  }
  else {
    files.value = newFiles.slice(0, 1) // 只取第一个文件
  }
}

// 移除文件
function removeFile(index: number) {
  files.value.splice(index, 1)
  // 如果没有文件了，重置状态
  if (files.value.length === 0) {
    uploadStatus.value = 'idle'
    uploadProgress.value = 0
  }
}

// 触发文件选择
function triggerFileInput() {
  fileInputRef.value?.click()
}

// 上传文件
async function uploadFiles() {
  if (files.value.length === 0 || uploading.value)
    return

  uploading.value = true
  uploadStatus.value = 'uploading'
  uploadProgress.value = 0

  try {
    const formData = new FormData()

    files.value.forEach((file, index) => {
      formData.append(props.multiple ? `file[${index}]` : 'file', file)
    })

    const response = await HTTPRequest({
      url: props.url,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        }
      },
    })

    uploadStatus.value = 'success'
    props.onSuccess?.(response)
    emits('success', response)
  }
  catch (error) {
    uploadStatus.value = 'error'
    errorMessage.value = '上传失败，请重试'
    props.onError?.(error)
    emits('error', error)
  }
  finally {
    uploading.value = false
  }
}

// 拖放区域的样式
const dropzoneClasses = computed(() => {
  return cn(
    'border-2 border-dashed rounded-lg p-6 transition-colors',
    'flex flex-col items-center justify-center gap-4',
    isDragging.value ? 'border-primary bg-primary/5' : 'border-border',
    uploadStatus.value === 'error' ? 'border-destructive bg-destructive/5' : '',
    uploadStatus.value === 'success' ? 'border-success bg-success/5' : '',
    props.class,
  )
})

// 拖放事件处理
function handleDragOver(event: DragEvent) {
  event.preventDefault()
  isDragging.value = true
}

function handleDragLeave() {
  isDragging.value = false
}
</script>

<template>
  <div class="w-full">
    <!-- 隐藏的文件输入 -->
    <input
      ref="fileInputRef"
      type="file"
      :accept="props.accept"
      :multiple="props.multiple"
      class="hidden"
      @change="handleFileSelect"
    >

    <!-- 拖放区域 -->
    <div
      :class="dropzoneClasses"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <div v-if="files.length === 0" class="flex flex-col items-center justify-center text-center">
        <Upload class="h-12 w-12 text-muted-foreground mb-2" />
        <h3 class="text-lg font-medium">
          拖拽文件到此处或点击上传
        </h3>
        <p class="text-sm text-muted-foreground mt-1">
          支持{{ props.multiple ? '多个' : '单个' }}文件，最大{{ props.maxSize }}MB
        </p>
        <Button type="button" variant="outline" class="mt-4" @click="triggerFileInput">
          选择文件
        </Button>
      </div>

      <!-- 文件列表 -->
      <div v-else class="w-full space-y-4">
        <div v-for="(file, index) in files" :key="index" class="flex items-center justify-between p-3 bg-background border rounded-md">
          <div class="flex items-center gap-3">
            <FileIcon class="h-6 w-6 text-primary" />
            <div class="flex flex-col">
              <span class="text-sm font-medium truncate max-w-[200px]">{{ file.name }}</span>
              <span class="text-xs text-muted-foreground">{{ formatFileSize(file.size) }}</span>
            </div>
          </div>
          <button
            type="button"
            class="text-muted-foreground hover:text-foreground transition-colors"
            @click="removeFile(index)"
          >
            <X class="h-4 w-4" />
          </button>
        </div>

        <!-- 上传状态 -->
        <div v-if="uploadStatus === 'error'" class="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle class="h-4 w-4" />
          <span>{{ errorMessage }}</span>
        </div>

        <div v-if="uploadStatus === 'success'" class="flex items-center gap-2 text-success text-sm">
          <CheckCircle2 class="h-4 w-4" />
          <span>上传成功</span>
        </div>

        <!-- 进度条 -->
        <div v-if="uploadStatus === 'uploading'" class="w-full bg-muted rounded-full h-2.5 dark:bg-gray-700">
          <div
            class="bg-primary h-2.5 rounded-full transition-all duration-300"
            :style="{ width: `${uploadProgress}%` }"
          />
          <div class="text-xs text-muted-foreground mt-1 text-right">
            {{ uploadProgress }}%
          </div>
        </div>

        <!-- 上传按钮 -->
        <div class="flex justify-end gap-2">
          <Button
            v-if="uploadStatus !== 'uploading'"
            type="button"
            variant="outline"
            @click="triggerFileInput"
          >
            {{ files.length > 0 ? '添加更多' : '选择文件' }}
          </Button>
          <Button
            type="button"
            variant="default"
            :disabled="uploading || files.length === 0 || uploadStatus === 'success'"
            @click="uploadFiles"
          >
            {{ uploading ? '上传中...' : '上传文件' }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
