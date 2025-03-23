import type { UserInfo } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null)
  const token = computed(() => userInfo.value?.token)
  const IS_LOGIN = computed(() => !!token.value)
  function setUserInfo(user: UserInfo | null) {
    userInfo.value = user
  }
  return {
    IS_LOGIN,
    token,
    userInfo,
    setUserInfo,
  }
}, {
  persist: true,
})
