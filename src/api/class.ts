import { GET } from '@/utils/HTTPRequest'

/**
 * @author Rika
 * @desc 获取班级列表
 * @see
 */
export async function getClassList() {
  try {
    const response = await GET<string[]>('/getSportByGrade')
    return response.data
  }
  catch (e) {
    console.error(e)
    throw e
  }
}
