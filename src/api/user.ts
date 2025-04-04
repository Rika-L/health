import type { LoginForm, RegisterForm } from '@/pages/authentication/schema'
import { POST } from '@/utils/HTTPRequest'

export interface UserInfo {
  avatar: string
  userid: string
  classid: string
  role: 'ROLE_ADMIN' | 'ROLE_TEACHER' | 'ROLE_STUDENT'
  token: string
  username: string
  [property: string]: any
}

export function userLogin(form: LoginForm) {
  return POST<UserInfo>('/auth/login', form)
}

export function userRegister(form: RegisterForm) {
  const registerData = {
    ...form,
    role: Number(form.role),
    permission: 1,
  }
  return POST('/account/register', registerData)
}
