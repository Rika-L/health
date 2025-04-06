import { Bell, Image, SquareTerminal, User } from 'lucide-vue-next'

// Menu items.
const menuItems: { title: string, url: string, icon: any, auth?: string[] }[] = [
  {
    title: '控制台',
    url: '/dashboard',
    icon: SquareTerminal,
  },
  {
    title: '用户信息管理',
    url: '/information',
    icon: User,
  },
  {
    title: '轮播图管理',
    url: '/swiper',
    icon: Image,
    auth: ['ROLE_ADMIN'],
  },
  {
    title: '公告管理',
    url: '/announcement',
    icon: Bell,
    auth: ['ROLE_ADMIN'],
  },
]

export default menuItems
