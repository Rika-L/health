import { GET } from '@/utils/HTTPRequest'

export interface Exam {
  age: number
  dash: number
  examResult: number
  examTime: string
  forwardBending: number
  gender: string
  height: number
  id: number
  longJump: number
  pullUp: number
  running: number
  sitUp: number
  userid: string
  vitalCapacity: number
  weight: number
}

export function getClassExam() {
  return GET<Exam[]>('/physical/teacher/getScoreClass')
}
