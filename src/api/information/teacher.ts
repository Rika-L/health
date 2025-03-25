import { GET } from '@/utils/HTTPRequest'
import { toast } from 'vue-sonner'

export interface TeacherDetail {
  accountId: number
  accountPermission: number
  password: string
  phoneNum: string
  teacherAvatar: string
  teacherGrade: string | null
  teacherId: number
  teacherName: string | null
  username: string
  [property: string]: any
}

export async function getTeacherDetail(id: number) {
  try {
    const { code, message, data } = await GET<TeacherDetail>(`/account/getTeacherAccount/${id}`)
    if (code === 200) {
      return data
    }
    else {
      toast.error(message)
      return null
    }
  }
  catch (e) {
    console.error(e)
    throw e
  }
}
