import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const loginFormZodSchema = z.object({
  username: z.string({ required_error: '请输入用户名' }).min(2, '用户名长度至少为 2').max(50, '用户名长度至多为 50'),
  password: z.string({ required_error: '请输入密码' }).min(2, '密码长度至少为 2').max(50, '密码长度至多为 50'),
  role: z.enum(['1', '2'], { required_error: '请选择角色' }),
})

export const loginFormSchema = toTypedSchema(loginFormZodSchema)

export type LoginForm = z.infer<typeof loginFormZodSchema>
