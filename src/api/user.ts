import type { LoginForm, RegisterForm } from '@/pages/authentication/schema'
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
  const registerData = {
    ...form,
    role: Number(form.role),
    permission: 1,
  }
  return POST('/account/register', registerData)
}
