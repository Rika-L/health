import { BookType, Calendar, Notebook, Search, Settings, SquareTerminal } from 'lucide-vue-next'

// Menu items.
const menuItems = [
  {
    title: '控制台',
    url: '/dashboard',
    icon: SquareTerminal,
  },
  {
    title: '学生信息管理',
    url: '/information/student',
    icon: BookType,
    auth: ['admin'],
  },
  {
    title: '教师信息管理',
    url: '/information/teacher',
    icon: Notebook,
    auth: ['admin'],
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
