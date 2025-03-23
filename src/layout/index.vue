<script lang="ts" setup>
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <main class="w-full">
      <AppHeader />
      <div class="p-4 min-h-[calc(100vh-64px)]">
        <RouterView />
      </div>
    </main>
  </SidebarProvider>
</template>
