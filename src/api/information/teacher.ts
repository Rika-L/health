import { DELETE } from '@/utils/HTTPRequest'

export async function deleteTeacher(id: number) {
  try {
    return (await DELETE(`/account/deleteTeacherAccount/${id}`))
  }
  catch (e) {
    console.error(e)
    throw e
  }
}
