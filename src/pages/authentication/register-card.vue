<script lang="ts" setup>
import { userRegister } from '@/api/user'
import { FormField } from '@/components/ui/form'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import { registerFormSchema } from './schema'

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: registerFormSchema,
})

const [isLoading, toggleIsLoading] = useToggle(false)
const avatarUrl = ref('')

const onSubmit = handleSubmit(async (values) => {
  if (!avatarUrl.value) {
    toast.error('请上传头像')
    return
  }
  toggleIsLoading(true)
  try {
    const { code, message } = await userRegister({
      ...values,
      avatar: avatarUrl.value,
    })
    if (code === 200) {
      toast.success(`注册成功，请登录`)
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
          请填写以下信息完成注册。
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-2">
        <div class="flex justify-center mb-4">
          <AvatarUpload v-model="avatarUrl" :disabled="isLoading" />
        </div>
        <FormField v-slot="{ componentField }" name="username" :validate-on-blur="!isFieldDirty">
          <FormItem class="grid gap-0.5 relative">
            <FormLabel>用户名</FormLabel>
            <FormControl>
              <Input type="text" placeholder="请输入用户名" v-bind="componentField" :disabled="isLoading" />
            </FormControl>
            <!-- <FormMessage class="absolute -bottom-5" /> -->
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="userid" :validate-on-blur="!isFieldDirty">
          <FormItem class="grid gap-0.5 relative">
            <FormLabel>用户ID</FormLabel>
            <FormControl>
              <Input type="text" placeholder="请输入用户ID" v-bind="componentField" :disabled="isLoading" />
            </FormControl>
            <!-- <FormMessage class="absolute -bottom-5" /> -->
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="classid" :validate-on-blur="!isFieldDirty">
          <FormItem class="grid gap-0.5 relative">
            <FormLabel>班级</FormLabel>
            <FormControl>
              <Select v-bind="componentField" :disabled="isLoading">
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
            </FormControl>
            <!-- <FormMessage class="absolute -bottom-5" /> -->
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
          <FormItem class="grid gap-0.5 relative">
            <FormLabel>密码</FormLabel>
            <FormControl>
              <Input type="password" placeholder="请输入密码" v-bind="componentField" :disabled="isLoading" />
            </FormControl>
            <!-- <FormMessage class="absolute -bottom-5" /> -->
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="confirmPassword" :validate-on-blur="!isFieldDirty">
          <FormItem class="grid gap-0.5 relative">
            <FormLabel>确认密码</FormLabel>
            <FormControl>
              <Input type="password" placeholder="请再次输入密码" v-bind="componentField" :disabled="isLoading" />
            </FormControl>
            <!-- <FormMessage class="absolute -bottom-5" /> -->
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="role" :validate-on-blur="!isFieldDirty">
          <FormItem class="grid gap-0.5 relative">
            <FormLabel>身份</FormLabel>
            <FormControl>
              <Select v-bind="componentField" :disabled="isLoading">
                <SelectTrigger>
                  <SelectValue placeholder="请选择一个注册身份" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="0">
                      管理员
                    </SelectItem>
                    <SelectItem value="1">
                      教师
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <!-- <FormMessage class="absolute -bottom-5" /> -->
          </FormItem>
        </FormField>
      </CardContent>
      <CardFooter>
        <Button class="w-full" type="submit" :disabled="isLoading">
          注册
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>
