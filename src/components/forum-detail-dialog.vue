<script setup lang="ts">
import type { ForumDetail } from '@/api/form'
import Button from '@/components/ui/button/Button.vue'
import { POST } from '@/utils/HTTPRequest'
import { toast } from 'vue-sonner'

const [isOpen, toggleIsOpen] = useToggle(false)
const forumDetails = ref<ForumDetail[]>([])
const forumId = ref<number | null>(null)
const callback = ref<(() => void) | null>(null)

defineExpose({
  open: (details: ForumDetail[], id: number, cb?: () => void) => {
    forumDetails.value = details
    forumId.value = id
    toggleIsOpen(true)
    if (cb)
      callback.value = cb
  },
})

async function handleDeleteComment(detailId: number) {
  try {
    const res = await POST(`/forum/delete/Details/${detailId}`)
    if (res.code === 200) {
      toast.success('评论删除成功')
      // 从列表中移除已删除的评论
      forumDetails.value = forumDetails.value.filter(detail => detail.forumDetailId !== detailId)
      // 如果有回调函数，执行它以刷新主页面数据
      if (callback.value)
        callback.value()
    }
    else {
      toast.error(res.message || '删除失败')
    }
  }
  catch (error) {
    console.error('删除评论失败:', error)
    toast.error('操作失败')
  }
}
</script>

<template>
  <Dialog :open="isOpen" @update:open="toggleIsOpen">
    <DialogContent class="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>帖子评论列表</DialogTitle>
        <DialogDescription>
          查看和管理帖子的所有评论
        </DialogDescription>
      </DialogHeader>

      <div class="max-h-[60vh] overflow-y-auto py-4">
        <div v-if="forumDetails.length === 0" class="text-center py-4 text-muted-foreground">
          暂无评论
        </div>
        <div v-else class="space-y-4">
          <div v-for="detail in forumDetails" :key="detail.forumDetailId" class="border rounded-lg p-4">
            <div class="flex justify-between items-start">
              <div>
                <div class="font-medium">
                  用户ID: {{ detail.userid || '-用户ID' }}
                </div>
              </div>
              <Button variant="destructive" size="sm" @click="handleDeleteComment(detail.forumDetailId)">
                删除
              </Button>
            </div>
            <div class="mt-2">
              {{ detail.content }}
            </div>
            <div class="mt-2 text-sm text-muted-foreground flex items-center gap-2">
              <span>点赞: {{ detail.love }}</span>
            </div>
          </div>
        </div>
      </div>

      <DialogFooter>
        <DialogClose as-child>
          <Button type="button" variant="secondary">
            关闭
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
