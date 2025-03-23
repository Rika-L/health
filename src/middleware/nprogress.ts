import router from '@/routes'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

router.beforeEach(() => {
  NProgress.start()
})
router.afterEach(() => {
  NProgress.done()
})
