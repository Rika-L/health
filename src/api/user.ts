import type { RegisterForm } from '@/pages/authentication/register-schema'
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

export function userRegister(form: RegisterForm) {
  // 注册时自动设置permission为1
  const registerData = {
    ...form,
    permission: 1,
  }
  return POST<UserInfo>('/account/register', registerData)
}
