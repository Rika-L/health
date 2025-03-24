<script lang="ts" setup>
import { DELETE } from '@/utils/HTTPRequest'
import { toast } from 'vue-sonner'

const [isOpen, toggleIsOpen] = useToggle(false)

const deleteUrl = ref<string | null>(null)
const callback = ref<(() => void) | null>(null)

defineExpose({
  open: (url: string, cb?: () => void) => {
    deleteUrl.value = url
    toggleIsOpen(true)
    if (cb)
      callback.value = cb
  },
})

async function handleDelete() {
  if (!deleteUrl.value) {
    toast.error('内部错误')
    return
  }
  const res = await DELETE(deleteUrl.value)
  if (res.code === 200) {
    toast.success('操作成功')
    toggleIsOpen(false)
    if (callback.value)
      callback.value()
  }
  else {
    toast.error(res.message)
  }
}
</script>

<template>
  <Dialog :open="isOpen" @update:open="toggleIsOpen">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>确认删除</DialogTitle>
        <DialogDescription>
          确定要删除吗? 该操作不可逆
        </DialogDescription>
      </DialogHeader>
      <DialogFooter class="justify-end gap-4">
        <Button variant="destructive" @click="handleDelete">
          确定
        </Button>
        <DialogClose as-child>
          <Button type="button" variant="secondary">
            取消
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
