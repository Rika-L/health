import { BookType, Notebook, SquareTerminal } from 'lucide-vue-next'

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
]

export default menuItems
