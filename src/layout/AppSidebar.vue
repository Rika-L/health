<script setup lang="ts">
import { useUserStore } from '@/store/user'
import menuItems from './menuItems'
import NavUser from './NavUser.vue'

const userStore = useUserStore()

const user = {
  username: userStore.userInfo?.username || '',
  userid: userStore.userInfo?.userid || '',
  avatar: userStore.avatar,
}

// 根据用户权限过滤菜单项
const filteredMenuItems = computed(() => {
  return menuItems.filter((item) => {
    // 如果菜单项没有auth属性或auth数组为空，则所有用户都可以访问
    if (!item.auth || item.auth.length === 0) {
      return true
    }
    // 否则检查用户是否有权限访问该菜单项
    return item.auth.includes(userStore.auth)
  })
})
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>学生运动与健康数据管理系统</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in filteredMenuItems" :key="item.title">
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
