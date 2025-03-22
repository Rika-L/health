<script lang="ts" setup>
import { FormField } from '@/components/ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2, '用户名长度至少为 2').max(50, '用户名长度至多为 50'),
  password: z.string().min(2, '密码长度至少为 2').max(50, '密码长度至多为 50'),
}))

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted!', values)
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
        <div class="grid gap-2">
          <Label for="password">身份</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="请选择一个登录身份" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">
                  老师
                </SelectItem>
                <SelectItem value="2">
                  管理员
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full" type="submit">
          登录
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>
