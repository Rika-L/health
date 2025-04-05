<script setup lang="ts">
import { updateUser } from '@/api/admin'
import { useToggle } from '@vueuse/core'
import { reactive, ref } from 'vue'
import { toast } from 'vue-sonner'
import { Form, FormField } from './ui/form'

interface UserForm {
  userid: string
  classid: string
  password: string
  username: string
  avatar: string
  role: string
}

const [isOpen, toggleIsOpen] = useToggle(false)
const form = reactive<UserForm>({
  userid: '',
  classid: '',
  password: '',
  username: '',
  avatar: '',
  role: '',
})

const callback = ref<(() => void) | null>(null)

defineExpose({
  open: (userData: Partial<UserForm>, cb?: () => void) => {
    console.log(userData)
    // 填充表单数据
    form.userid = userData.userid || ''
    form.classid = userData.classid || ''
    form.username = userData.username || ''
    form.avatar = userData.avatar || ''
    form.role = userData.role || ''
    toggleIsOpen(true)
    if (cb)
      callback.value = cb
  },
})

async function handleSubmit() {
  try {
    const res = await updateUser(form)
    if (res.code === 200) {
      toast.success('更新成功')
      toggleIsOpen(false)
      if (callback.value)
        callback.value()
    }
    else {
      toast.error(res.msg || '更新失败')
    }
  }
  catch (error) {
    console.error(error)
    toast.error('操作失败')
  }
}
</script>

<template>
  <Dialog :open="isOpen" @update:open="toggleIsOpen">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>编辑用户信息</DialogTitle>
        <DialogDescription>
          请修改用户信息
        </DialogDescription>
      </DialogHeader>

      <Form @submit="handleSubmit">
        <div class="grid gap-4 py-4">
          <FormField name="avatar">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label class="text-right">头像</Label>
              <div class="col-span-3 flex justify-start">
                <AvatarUpload v-model="form.avatar" />
              </div>
            </div>
          </FormField>

          <FormField name="userid">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label class="text-right">用户ID</Label>
              <Input id="userid" v-model="form.userid" class="col-span-3" readonly disabled />
            </div>
          </FormField>

          <FormField name="username">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label class="text-right">用户名</Label>
              <Input id="username" v-model="form.username" required class="col-span-3" />
            </div>
          </FormField>

          <FormField name="classid">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label class="text-right">班级ID</Label>
              <Select v-model="form.classid" required>
                <SelectTrigger>
                  <SelectValue placeholder="请选择班级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="class1">
                      班级一
                    </SelectItem>
                    <SelectItem value="class2">
                      班级二
                    </SelectItem>
                    <SelectItem value="class3">
                      班级三
                    </SelectItem>
                    <SelectItem value="class4">
                      班级四
                    </SelectItem>
                    <SelectItem value="class5">
                      班级五
                    </SelectItem>
                    <SelectItem value="class6">
                      班级六
                    </SelectItem>
                    <SelectItem value="class7">
                      班级七
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </FormField>

          <FormField name="password">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label class="text-right">密码</Label>
              <Input id="password" v-model="form.password" type="password" class="col-span-3" placeholder="留空表示不修改" />
            </div>
          </FormField>

          <FormField name="role">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label class="text-right">角色</Label>
              <Select v-model="form.role" required>
                <SelectTrigger class="col-span-3">
                  <SelectValue placeholder="选择角色" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ROLE_ADMIN">
                    管理员
                  </SelectItem>
                  <SelectItem value="ROLE_TEACHER">
                    老师
                  </SelectItem>
                  <SelectItem value="ROLE_STUDENT">
                    学生
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FormField>
        </div>

        <DialogFooter class="justify-end gap-4">
          <Button type="submit">
            保存
          </Button>
          <DialogClose as-child>
            <Button variant="secondary">
              取消
            </Button>
          </DialogClose>
        </DialogFooter>
      </Form>
    </DialogContent>
  </Dialog>
</template>
