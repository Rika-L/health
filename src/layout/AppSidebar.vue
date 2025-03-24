<script setup lang="ts">
import { useUserStore } from '@/store/user'
import menuItems from './menuItems'
import NavUser from './NavUser.vue'

const userStore = useUserStore()

const user = {
  name: userStore.userInfo?.username || '',
  phoneNum: userStore.userInfo?.phoneNum || '',
  avatar: userStore.avatar,
}
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>学生运动与健康数据管理系统</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in menuItems" :key="item.title">
              <SidebarMenuButton as-child>
                <RouterLink :to="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
