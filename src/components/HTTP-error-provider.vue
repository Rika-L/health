<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import { injectHttpStatusErrorHandler } from '@/utils/HTTPRequest'
import { toast } from 'vue-sonner'

const $router = useRouter()

injectHttpStatusErrorHandler((message, statusCode) => {
  if (statusCode === 401) {
    const useStore = useUserStore()
    useStore.setUserInfo(null)
    $router.push({ name: 'NotLogin' })
  }
  toast(String(statusCode), { description: message })
})
</script>

<template>
  <Sonner />
</template>
