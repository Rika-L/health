<script lang="ts" setup>
import { userLogin } from '@/api/user'
import { FormField } from '@/components/ui/form'
import { useUserStore } from '@/store/user'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import { loginFormSchema } from './schema'

const $router = useRouter()

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: loginFormSchema,
})

const userStore = useUserStore()

const onSubmit = handleSubmit(async (values) => {
  try {
    const { code, message, data } = await userLogin(values)
    if (code === 200) {
      userStore.setUserInfo(data)
      toast.success(`欢迎回来${data.username}`)
      $router.push('/dashboard')
    }
    else {
      toast.error(`错误:${code}`, { description: message })
    }
  }
  catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <Card class="w-full max-w-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
              <Input type="text" placeholder="请输入用户名" v-bind="componentField" />
            </FormControl>
            <FormMessage class="absolute -bottom-5" />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
          <FormItem class="grid gap-0.5 relative">
            <FormLabel>密码</FormLabel>
            <FormControl>
              <Input type="password" placeholder="请输入密码" v-bind="componentField" />
            </FormControl>
            <FormMessage class="absolute -bottom-5" />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="role" :validate-on-blur="!isFieldDirty">
          <FormItem class="grid gap-0.5 relative">
            <FormLabel>身份</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger>
                  <SelectValue placeholder="请选择一个登录身份" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1">
                      管理员
                    </SelectItem>
                    <SelectItem value="2">
                      教师
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage class="absolute -bottom-5" />
          </FormItem>
        </FormField>
      </CardContent>
      <CardFooter>
        <Button class="w-full" type="submit">
          登录
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>
