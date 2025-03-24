import router from '@/routes'
import { useUserStore } from '@/store/user'

router.beforeEach((to) => {
  const userStore = useUserStore()

  if (!userStore.IS_LOGIN && to.name !== 'Authentication') {
    return { name: 'Authentication' }
  }

  if (userStore.IS_LOGIN && to.name === 'Authentication') {
    return { name: 'Dashboard' }
  }

  console.log(userStore.auth)
  const requiredAuth = to.meta.auth as string[] | undefined
  if (requiredAuth && !requiredAuth.includes(userStore.auth)) {
    return { name: 'NotAuthorized' }
  }
})
