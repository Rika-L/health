<script lang="ts" setup>
import { userLogin } from '@/api/user'
import { FormField } from '@/components/ui/form'
import { useClassStore } from '@/store/class'
import { useUserStore } from '@/store/user'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import { loginFormSchema } from './schema'

const $router = useRouter()

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: loginFormSchema,
})

const userStore = useUserStore()
const classStore = useClassStore()

const [isLoading, toggleIsLoading] = useToggle(false)

const onSubmit = handleSubmit(async (values) => {
  toggleIsLoading(true)
  try {
    const { code, message, data } = await userLogin(values)
    if (code === 200) {
      userStore.setUserInfo(data)
      // 获取班级列表
      await classStore.fetchClassList()
      toast.success(`欢迎回来，${data.username}!`)
      $router.push('/dashboard')
    }
    else {
      toast.error(`错误:${code}`, { description: message })
    }
  }
  catch (e) {
    console.error(e)
  }
  finally {
    toggleIsLoading(false)
  }
})
</script>

<template>
  <Card>
    <form @submit="onSubmit">
      <CardHeader>
        <CardTitle class="text-2xl">
          学生运动与健康数据管理系统
        </CardTitle>
        <CardDescription>
          请输入用户名和密码以登录。
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-6">
        <FormField v-slot="{ componentField }" name="username" :validate-on-blur="!isFieldDirty">
          <FormItem class="grid gap-0.5 relative">
            <FormLabel>用户名</FormLabel>
            <FormControl>
              <Input type="text" placeholder="请输入用户名" v-bind="componentField" :disabled="isLoading" />
            </FormControl>
            <FormMessage class="absolute -bottom-5" />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
          <FormItem class="grid gap-0.5 relative">
            <FormLabel>密码</FormLabel>
            <FormControl>
              <Input type="password" placeholder="请输入密码" v-bind="componentField" :disabled="isLoading" />
            </FormControl>
            <FormMessage class="absolute -bottom-5" />
          </FormItem>
        </FormField>
      </CardContent>
      <CardFooter>
        <Button class="w-full" type="submit" :disabled="isLoading">
          登录
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>
