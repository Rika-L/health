import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const registerFormZodSchema = z.object({
  username: z.string({ required_error: '请输入用户名' }).min(2, '用户名长度至少为 2').max(50, '用户名长度至多为 50'),
  password: z.string({ required_error: '请输入密码' }).min(6, '密码长度至少为 6').max(50, '密码长度至多为 50'),
  confirmPassword: z.string({ required_error: '请确认密码' }),
  role: z.enum(['1', '2'], { required_error: '请选择角色' }),
  phoneNum: z.string({ required_error: '请输入手机号' }).regex(/^1[3-9]\d{9}$/, '请输入正确的手机号'),
  avatar: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: '两次输入的密码不一致',
  path: ['confirmPassword'],
})

export const registerFormSchema = toTypedSchema(registerFormZodSchema)

export type RegisterForm = z.infer<typeof registerFormZodSchema>
