import { Bike, BookType, Notebook, SquareTerminal } from 'lucide-vue-next'

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
  },
  {
    title: '教师信息管理',
    url: '/information/teacher',
    icon: Notebook,
    auth: ['admin'],
  },
  {
    title: '运动信息管理',
    url: '/sport',
    icon: Bike,
  },
]

export default menuItems
