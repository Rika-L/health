<script lang="ts" setup>
import LoginCard from './login-card.vue'
import RegisterCard from './register-card.vue'
</script>

<template>
  <Tabs default-value="login" class="w-full max-w-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="login">
        登录
      </TabsTrigger>
      <TabsTrigger value="register">
        注册
      </TabsTrigger>
    </TabsList>
    <TabsContent value="login">
      <LoginCard />
    </TabsContent>
    <TabsContent value="register">
      <RegisterCard />
    </TabsContent>
  </Tabs>
</template>
