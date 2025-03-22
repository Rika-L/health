<script lang="ts" setup>
import { injectHttpStatusErrorHandler } from '@/utils/HTTPRequest'
import { toast } from 'vue-sonner'

injectHttpStatusErrorHandler((message, statusCode) => {
  toast(String(statusCode), { description: message })
})
</script>

<template>
  <Sonner />
</template>
