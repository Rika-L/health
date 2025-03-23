import type { RouterOptions } from 'vue-router'

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/dashboard.vue'),
      },
      {
        path: 'test',
        name: 'Test',
        component: () => import('@/pages/test.vue'),
      },
    ],
  },
  {
    path: '/authentication',
    name: 'Authentication',
    component: () => import('@/pages/authentication/index.vue'),
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/pages/not-found.vue') },
]

export default routes
