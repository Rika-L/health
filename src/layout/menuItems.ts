import { Bike, SquareTerminal, User } from 'lucide-vue-next'

// Menu items.
const menuItems: { title: string, url: string, icon: any, auth?: string }[] = [
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
    title: '运动信息管理',
    url: '/sport',
    icon: Bike,
  },
]

export default menuItems
