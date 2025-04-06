import type { UserInfo } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null)
  const token = computed(() => userInfo.value?.token)
  const avatar = computed(() => import.meta.env.VITE_REQUEST_BASE_URL + userInfo.value?.avatar)
  const IS_LOGIN = computed(() => !!token.value)
  const auth = computed(() => userInfo.value?.role)
  function setUserInfo(user: UserInfo | null) {
    userInfo.value = user
  }
  return {
    auth,
    IS_LOGIN,
    token,
    avatar,
    userInfo,
    setUserInfo,
  }
}, {
  persist: true,
})
