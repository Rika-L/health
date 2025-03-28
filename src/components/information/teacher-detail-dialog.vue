<script lang="ts" setup>
import type { TeacherDetail } from '@/api/information/teacher'
import { getTeacherDetail, putTeacherDetail } from '@/api/information/teacher'
import { useClassStore } from '@/store/class'

const [isOpen, toggleIsOpen] = useToggle(false)
const teacherDetail = ref<TeacherDetail | null>(null)
const [isEdit, toggleIsEdit] = useToggle(false)
const editedTeacherDetail = ref<TeacherDetail | null>(null)
const [isLoading, toggleIsLoading] = useToggle(false)
const callback = ref<(() => void) | null>(null)

const { VITE_REQUEST_BASE_URL } = import.meta.env

function startEdit() {
  if (teacherDetail.value) {
    editedTeacherDetail.value = { ...teacherDetail.value, teacherName: teacherDetail.value.teacherName || '', teacherGrade: teacherDetail.value.teacherGrade || '' }
    toggleIsEdit(true)
  }
}

function cancelEdit() {
  toggleIsEdit(false)
  editedTeacherDetail.value = null
}

async function saveEdit() {
  if (editedTeacherDetail.value) {
    toggleIsLoading(true)
    try {
      const res = await putTeacherDetail(editedTeacherDetail.value)
      if (res) {
        toggleIsOpen(false)
        if (callback.value)
          callback.value()
      }
    }
    catch (e) {
      console.error(e)
    }
    finally {
      toggleIsLoading(false)
    }
  }
}

defineExpose({
  open: async (id: number, cb?: () => void) => {
    // reset
    toggleIsEdit(false)
    teacherDetail.value = null
    toggleIsOpen(true)
    const data = await getTeacherDetail(id)
    teacherDetail.value = data
    if (cb)
      callback.value = cb
  },
})

const classStore = useClassStore()
</script>

<template>
  <Dialog :open="isOpen" @update:open="toggleIsOpen">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>教师详情</DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <Skeleton v-if="!teacherDetail" class="h-64" />
      <div v-else-if="!isEdit" class="flex flex-col gap-4">
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
      <div v-else class="flex flex-col gap-4">
        <div class="flex gap-8">
          <AvatarUpload v-model:model-value="editedTeacherDetail!.teacherAvatar" :disabled="isLoading" />
          <div class="flex flex-col justify-between gap-2">
            <div>
              <Label>教师姓名</Label>
              <Input v-model="editedTeacherDetail!.teacherName as string" placeholder="请输入教师姓名" :disabled="isLoading" />
            </div>
            <div>
              <Label>班级</Label>
              <Select v-model="editedTeacherDetail!.teacherGrade" :disabled="isLoading">
                <SelectTrigger>
                  <SelectValue placeholder="请选择班级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="item in classStore.classList" :key="item" :value="item">
                      {{ item }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div>
          <Label>账号名</Label>
          <Input v-model="editedTeacherDetail!.username" placeholder="请输入账号" :disabled="isLoading" />
        </div>
        <div>
          <Label>密码</Label>
          <Input v-model="editedTeacherDetail!.password" placeholder="请输入密码" :disabled="isLoading" />
        </div>
        <div>
          <Label>电话</Label>
          <Input v-model="editedTeacherDetail!.phoneNum" placeholder="请输入电话" :disabled="isLoading" />
        </div>
      </div>
      <DialogFooter class="justify-end gap-2">
        <Button v-if="!isEdit" :disabled="isLoading" @click="startEdit()">
          编辑
        </Button>
        <template v-else>
          <Button variant="outline" :disabled="isLoading" @click="cancelEdit()">
            取消
          </Button>
          <Button :disabled="isLoading" @click="saveEdit()">
            保存
          </Button>
        </template>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
