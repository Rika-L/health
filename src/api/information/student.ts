import { GET, PUT } from '@/utils/HTTPRequest'
import { toast } from 'vue-sonner'

export interface StudentDetail {
  accountId: number
  accountPermission: number
  password: string
  phoneNum: string
  studentAvatar: string
  studentId: number
  studentName: string | null
  studentGrade: string | null
  studentAge: number | null
  studentGender: number | null
  studentHeight: number | null
  studentWeight: number | null
  username: string
  [property: string]: any
}

export async function getStudentDetail(id: number) {
  try {
    const { code, message, data } = await GET<StudentDetail>(`/account/getStudentAccount/${id}`)
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

export async function putStudentDetail(data: StudentDetail) {
  try {
    const { code, message } = await PUT<StudentDetail>(`/account/updateStudentAccount`, data)
    if (code === 200) {
      toast.success('操作成功')
      return true
    }
    else {
      toast.error(message)
      return false
    }
  }
  catch (e) {
    console.error(e)
    throw e
  }
}
