import { Calendar, Inbox, Search, Settings, SquareTerminal } from 'lucide-vue-next'

// Menu items.
const menuItems = [
  {
    title: '控制台',
    url: '/dashboard',
    icon: SquareTerminal,
  },
  {
    title: '测试页面',
    url: '/test',
    icon: Inbox,
  },
  {
    title: 'yyy管理',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'zzz管理',
    url: '#',
    icon: Search,
  },
  {
    title: '设置',
    url: '#',
    icon: Settings,
  },
]

export default menuItems
