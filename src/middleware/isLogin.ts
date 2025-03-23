import router from '@/routes'
import { useUserStore } from '@/store/user'

router.beforeEach((to) => {
  const userStore = useUserStore()
  console.log(userStore.IS_LOGIN)
  if (!userStore.IS_LOGIN && to.name !== 'Authentication') {
    return { name: 'Authentication' }
  }
  if (userStore.IS_LOGIN && to.name === 'Authentication') {
    return { name: 'Dashboard' }
  }
})
