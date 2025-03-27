<script lang="ts" setup>
import menuItems from './menuItems'

const $route = useRoute()

function getMenuTitle(path: string) {
  const item = menuItems.find(item => item.url === path)?.title
  return item
}
</script>

<template>
  <header class="flex h-16 shrink-0 items-center justify-between border-b px-4 sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm backdrop-saturate-150">
    <div class="flex gap-2 items-center">
      <SidebarTrigger class="-ml-1" />
      <Separator orientation="vertical" class="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem v-if="$route.path === '/dashboard'" class="hidden md:block">
            <BreadcrumbPage>控制台</BreadcrumbPage>
          </BreadcrumbItem>
          <template v-else>
            <BreadcrumbItem class="hidden md:block">
              <BreadcrumbLink href="/#/dashboard">
                控制台
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator class="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{{ getMenuTitle($route.path) }}</BreadcrumbPage>
            </BreadcrumbItem>
          </template>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
    <ModeToggle />
  </header>
</template>
