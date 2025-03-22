<script lang="ts" setup>
import { toast } from 'vue-sonner'
</script>

<template>
  <Card class="w-full max-w-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    <CardHeader>
      <CardTitle class="text-2xl">
        学生运动与健康数据管理系统
      </CardTitle>
      <CardDescription>
        请输入用户名和密码以登录。
      </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-4">
      <div class="grid gap-2">
        <Label for="email">用户名</Label>
        <Input id="email" type="email" placeholder="请输入用户名" required />
      </div>
      <div class="grid gap-2">
        <Label for="password">密码</Label>
        <Input id="password" type="password" placeholder="请输入密码" required />
      </div>
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
      <Button class="w-full" @click="toast('aaa')">
        登录
      </Button>
    </CardFooter>
  </Card>
</template>
