import type { LoginForm } from '@/pages/authentication/schema'
import { POST } from '@/utils/HTTPRequest'

export interface UserInfo {
  avatar: string
  permission: number
  phoneNum: string
  regdate: string
  role: number
  token: string
  username: string
  [property: string]: any
}

export function userLogin(form: LoginForm) {
  return POST<UserInfo>('/account/login', form)
}
