<script lang="ts" setup>
import type { StudentDetail } from '@/api/information/student'
import { getStudentDetail, putStudentDetail } from '@/api/information/student'
import { useClassStore } from '@/store/class'
import { formatSex } from '../../utils/formatSex'

const [isOpen, toggleIsOpen] = useToggle(false)
const studentDetail = ref<StudentDetail | null>(null)
const [isEdit, toggleIsEdit] = useToggle(false)
const editedStudentDetail = ref<StudentDetail | null>(null)
const [isLoading, toggleIsLoading] = useToggle(false)
const callback = ref<(() => void) | null>(null)

const { VITE_REQUEST_BASE_URL } = import.meta.env

function startEdit() {
  if (studentDetail.value) {
    editedStudentDetail.value = {
      ...studentDetail.value,
      studentName: studentDetail.value.studentName || '',
      studentGrade: studentDetail.value.studentGrade || '',
      studentAge: studentDetail.value.studentAge || null,
      studentGender: String(studentDetail.value.studentGender) || '',
      studentHeight: studentDetail.value.studentHeight || null,
      studentWeight: studentDetail.value.studentWeight || null,
    }
    toggleIsEdit(true)
  }
}

function cancelEdit() {
  toggleIsEdit(false)
  editedStudentDetail.value = null
}

async function saveEdit() {
  if (editedStudentDetail.value) {
    toggleIsLoading(true)
    try {
      const res = await putStudentDetail({ ...editedStudentDetail.value, studentGender: Number(editedStudentDetail.value.studentGender) })
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
    studentDetail.value = null
    toggleIsOpen(true)
    const data = await getStudentDetail(id)
    studentDetail.value = data
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
        <DialogTitle>学生详情</DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <Skeleton v-if="!studentDetail" class="h-64" />
      <div v-else-if="!isEdit" class="flex flex-col gap-4">
        <div class="flex gap-8">
          <Avatar class="size-20">
            <AvatarImage :src="VITE_REQUEST_BASE_URL + studentDetail.studentAvatar" alt="avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div class="flex flex-col justify-between">
            <div><Label>学生姓名</Label>: {{ studentDetail.studentName || "未设定" }}</div>
            <div><Label>班级</Label>: {{ studentDetail.studentGrade || '未设定' }}</div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div><Label>年龄</Label>: {{ studentDetail.studentAge || '未设定' }}</div>
          <div><Label>性别</Label>: {{ formatSex(studentDetail.studentGender) }}</div>
          <div><Label>身高</Label>: {{ studentDetail.studentHeight ? `${studentDetail.studentHeight} cm` : '未设定' }}</div>
          <div><Label>体重</Label>: {{ studentDetail.studentWeight ? `${studentDetail.studentWeight} kg` : '未设定' }}</div>
        </div>
        <div><Label>用户名</Label>: {{ studentDetail.username }}</div>
        <div><Label>密码</Label>: {{ studentDetail.password }}</div>
        <div><Label>电话</Label>: {{ studentDetail.phoneNum }}</div>
      </div>
      <div v-else class="flex flex-col gap-4">
        <div class="flex gap-8">
          <AvatarUpload v-model:model-value="editedStudentDetail!.studentAvatar" :disabled="isLoading" />
          <div class="flex flex-col justify-between gap-2">
            <div>
              <Label>学生姓名</Label>
              <Input v-model="editedStudentDetail!.studentName as string" placeholder="请输入学生姓名" :disabled="isLoading" />
            </div>
            <div>
              <Label>班级</Label>
              <Select v-model="editedStudentDetail!.studentGrade" :disabled="isLoading">
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
        <div class="grid grid-cols-2 gap-4">
          <div>
            <Label>年龄</Label>
            <Input v-model.number="editedStudentDetail!.studentAge" type="number" placeholder="请输入年龄" :disabled="isLoading" />
          </div>
          <div>
            <Label>性别</Label>
            <Select v-model="editedStudentDetail!.studentGender" :disabled="isLoading">
              <SelectTrigger>
                <SelectValue placeholder="请选择性别" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">
                    男
                  </SelectItem>
                  <SelectItem value="0">
                    女
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>身高 (cm)</Label>
            <Input v-model.number="editedStudentDetail!.studentHeight" type="number" placeholder="请输入身高" :disabled="isLoading" />
          </div>
          <div>
            <Label>体重 (kg)</Label>
            <Input v-model.number="editedStudentDetail!.studentWeight" type="number" placeholder="请输入体重" :disabled="isLoading" />
          </div>
        </div>
        <div>
          <Label>账号名</Label>
          <Input v-model="editedStudentDetail!.username" placeholder="请输入账号" :disabled="isLoading" />
        </div>
        <div>
          <Label>密码</Label>
          <Input v-model="editedStudentDetail!.password" placeholder="请输入密码" :disabled="isLoading" />
        </div>
        <div>
          <Label>电话</Label>
          <Input v-model="editedStudentDetail!.phoneNum" placeholder="请输入电话" :disabled="isLoading" />
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
../../utils/formatSex
