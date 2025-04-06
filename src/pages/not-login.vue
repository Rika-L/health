<script lang="ts" setup>
const $router = useRouter()

function goLogin() {
  $router.push({ name: 'Authentication' })
}
</script>

<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-64px)]">
    <Card class="w-full max-w-md mx-auto text-center shadow-lg">
      <CardHeader>
        <CardTitle class="text-6xl font-bold text-primary">
          401
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-xl mb-4">
          登录过期
        </p>
        <p class="text-muted-foreground mb-6">
          您的登录已过期，请重新登录
        </p>
      </CardContent>
      <CardFooter class="flex justify-center">
        <Button class="px-6" @click="goLogin">
          重新登录
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
