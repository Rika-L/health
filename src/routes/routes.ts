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
        path: '/information',
        name: 'Information',
        redirect: '/information/student',
        children: [
          {
            path: '/information/student',
            name: 'Student',
            component: () => import('@/pages/information/student/index.vue'),
          },
          {
            path: '/information/teacher',
            name: 'Teacher',
            component: () => import('@/pages/information/teacher/index.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/authentication',
    name: 'Authentication',
    component: () => import('@/pages/authentication/index.vue'),
  },
  { path: '/401', name: 'NotAuthorized', component: () => import('@/pages/not-auth.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/pages/not-found.vue') },
]

export default routes
