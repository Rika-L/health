import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const loginFormZodSchema = z.object({
  userid: z.string({ required_error: '请输入用户ID' }).min(2, '用户ID长度至少为 2').max(50, '用户ID长度至多为 50'),
  password: z.string({ required_error: '请输入密码' }).min(2, '密码长度至少为 2').max(50, '密码长度至多为 50'),
})

export const loginFormSchema = toTypedSchema(loginFormZodSchema)

export type LoginForm = z.infer<typeof loginFormZodSchema>

const registerFormZodSchema = z.object({
  username: z.string({ required_error: '请输入用户名' }).min(2, '用户名长度至少为 2').max(50, '用户名长度至多为 50'),
  userid: z.string({ required_error: '请输入用户ID' }).min(2, '用户ID长度至少为 2').max(50, '用户ID长度至多为 50'),
  password: z.string({ required_error: '请输入密码' }).min(2, '密码长度至少为 2').max(50, '密码长度至多为 50'),
  confirmPassword: z.string({ required_error: '请确认密码' }),
  role: z.enum(['0', '1'], { required_error: '请选择角色' }),
  classid: z.string({ required_error: '请输入班级ID' }).min(2, '班级ID长度至少为 2').max(50, '班级ID长度至多为 50'),
  avatar: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: '两次输入的密码不一致',
  path: ['confirmPassword'],
})

export const registerFormSchema = toTypedSchema(registerFormZodSchema)

export type RegisterForm = z.infer<typeof registerFormZodSchema>
