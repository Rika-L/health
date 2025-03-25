<script lang="ts" setup>
import type { TeacherDetail } from '@/api/information/teacher'
import { getTeacherDetail } from '@/api/information/teacher'

const [isOpen, toggleIsOpen] = useToggle(false)
const teacherDetail = ref<TeacherDetail | null>(null)

watchEffect(() => {
  if (!isOpen.value) // 退出时清空
    teacherDetail.value = null
})

const { VITE_REQUEST_BASE_URL } = import.meta.env

defineExpose({
  open: async (id: number) => {
    toggleIsOpen(true)
    const data = await getTeacherDetail(id)
    teacherDetail.value = data
  },
})
</script>

<template>
  <Dialog :open="isOpen" @update:open="toggleIsOpen">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>教师详情</DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <Skeleton v-if="!teacherDetail" class="h-64" />
      <div v-else class="flex flex-col gap-4">
        <div class="flex gap-8">
          <Avatar class="size-20">
            <AvatarImage :src="VITE_REQUEST_BASE_URL + teacherDetail.teacherAvatar" alt="avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div class="flex flex-col justify-between">
            <div><Label>教师姓名</Label>: {{ teacherDetail.teacherName || '未设定' }}</div>
            <div><Label>班级</Label>: {{ teacherDetail.teacherGrade || '未设定' }}</div>
          </div>
        </div>
        <div><Label>用户名</Label>: {{ teacherDetail.username }}</div>
        <div><Label>密码</Label>: {{ teacherDetail.password }}</div>
        <div><Label>电话</Label>: {{ teacherDetail.phoneNum }}</div>
      </div>
      <DialogFooter class="justify-end">
        <Button>编辑</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
