<script lang="ts" setup>
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <main class="w-full">
      <AppHeader />
      <RouterView />
    </main>
  </SidebarProvider>
</template>
