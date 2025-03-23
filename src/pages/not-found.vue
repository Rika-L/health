<script lang="ts" setup>
const $router = useRouter()

function goHome() {
  $router.push({ name: 'Dashboard' })
}
</script>

<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-64px)]">
    <Card class="w-full max-w-md mx-auto text-center shadow-lg">
      <CardHeader>
        <CardTitle class="text-6xl font-bold text-primary">
          404
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-xl mb-4">
          页面未找到
        </p>
        <p class="text-muted-foreground mb-6">
          您访问的页面不存在或已被移除
        </p>
      </CardContent>
      <CardFooter class="flex justify-center">
        <Button class="px-6" @click="goHome">
          返回首页
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
