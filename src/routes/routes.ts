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
        component: () => import('@/pages/information/index.vue'),
      },
      {
        path: '/swiper',
        name: 'Swiper',
        component: () => import('@/pages/swiper/index.vue'),
        meta: { auth: ['ROLE_ADMIN'] },
      },
      {
        path: '/announcement',
        name: 'Announcement',
        component: () => import('@/pages/announcement/index.vue'),
        meta: { auth: ['ROLE_ADMIN'] },
      },
      {
        path: '/forum',
        name: 'Forum',
        component: () => import('@/pages/forum.vue'),
        meta: { auth: ['ROLE_ADMIN'] },
      },
      {
        path: '/sport',
        name: 'Sport',
        component: () => import('@/pages/sport.vue'),
      },
    ],
  },
  {
    path: '/authentication',
    name: 'Authentication',
    component: () => import('@/pages/authentication/index.vue'),
  },
  { path: '/403', name: 'NotAuthorized', component: () => import('@/pages/not-auth.vue') },
  { path: '/401', name: 'NotLogin', component: () => import('@/pages/not-login.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/pages/not-found.vue') },

]

export default routes
