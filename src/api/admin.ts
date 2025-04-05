import { POST } from '@/utils/HTTPRequest'

interface UserUpdateForm {
  userid: string
  classid: string
  password?: string
  username: string
  avatar: string
  role: string
}

/**
 * 更新用户信息
 * @param form 用户信息表单
 * @returns Promise
 */
export function updateUser(form: UserUpdateForm) {
  return POST('/admin/update/user', form)
}
