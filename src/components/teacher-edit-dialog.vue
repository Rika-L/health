<script lang="ts" setup>
import FileUpload from '@/components/file-upload.vue'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { POST } from '@/utils/HTTPRequest'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import { z } from 'zod'

const props = defineProps<{
  open: boolean
  teacher: {
    id: number
    username: string
    password: string
    avatar: string
    role: number
    phoneNum: string
    permission: number
    token: string | null
    regdate: string
  } | null
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  'teacher-updated': []
}>()

const teacherFormSchema = toTypedSchema(
  z.object({
    id: z.number(),
    username: z.string({ required_error: '请输入用户名' }).min(2, '用户名长度至少为 2').max(50, '用户名长度至多为 50'),
    password: z.string({ required_error: '请输入密码' }).min(2, '密码长度至少为 2').max(50, '密码长度至多为 50'),
    phoneNum: z.string({ required_error: '请输入手机号' }).regex(/^1[3-9]\d{9}$/, '请输入正确的手机号'),
    avatar: z.string().optional(),
    role: z.number(),
    permission: z.number(),
  }),
)

const { handleSubmit, isSubmitting, setValues } = useForm({
  validationSchema: teacherFormSchema,
})

const avatarUrl = ref('')

watchEffect(() => {
  if (props.teacher && props.open) {
    setValues({
      id: props.teacher.id,
      username: props.teacher.username,
      password: props.teacher.password,
      phoneNum: props.teacher.phoneNum,
      avatar: props.teacher.avatar,
      role: props.teacher.role,
      permission: props.teacher.permission,
    })
    avatarUrl.value = props.teacher.avatar
  }
})

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await POST('/account/updateTeacherAccount', {
      ...values,
      avatar: avatarUrl.value,
    })

    if (response.code === 200) {
      toast.success('更新成功')
      emit('update:open', false)
      emit('teacher-updated')
    }
    else {
      toast.error('更新失败', { description: response.message })
    }
  }
  catch (error) {
    console.error('更新失败', error)
    toast.error('更新失败，请重试')
  }
})

function closeDialog() {
  emit('update:open', false)
}
</script>

<template>
  <Dialog :open="open" @update:open="closeDialog">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>编辑教师信息</DialogTitle>
        <DialogDescription>
          修改教师信息后点击保存按钮提交更改
        </DialogDescription>
      </DialogHeader>
      <Form @submit="onSubmit">
        <div class="grid gap-4 py-4">
          <div class="flex items-center justify-center mb-4">
            <FileUpload v-model="avatarUrl" :disabled="isSubmitting" />
          </div>
          <FormField v-slot="{ componentField }" name="username">
            <FormItem class="grid gap-0.5 relative">
              <FormLabel>用户名</FormLabel>
              <FormControl>
                <Input v-bind="componentField" placeholder="请输入用户名" />
              </FormControl>
              <FormMessage class="absolute -bottom-5" />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem class="grid gap-0.5 relative">
              <FormLabel>密码</FormLabel>
              <FormControl>
                <Input v-bind="componentField" type="password" placeholder="请输入密码" />
              </FormControl>
              <FormMessage class="absolute -bottom-5" />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="phoneNum">
            <FormItem class="grid gap-0.5 relative">
              <FormLabel>手机号</FormLabel>
              <FormControl>
                <Input v-bind="componentField" placeholder="请输入手机号" />
              </FormControl>
              <FormMessage class="absolute -bottom-5" />
            </FormItem>
          </FormField>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" :disabled="isSubmitting" @click="closeDialog">
            取消
          </Button>
          <Button type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? '保存中...' : '保存' }}
          </Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  </Dialog>
</template>
