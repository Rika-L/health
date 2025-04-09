import { GET } from '@/utils/HTTPRequest'

export interface Forum {
  content: string
  forumDetailVO_List: ForumDetail[]
  forumid: number
  img: string
  love: number
  status: number
  time: string
  userid: string
  [property: string]: any
}

export interface ForumDetail {
  content: string
  forumDetailId: number
  forumid: number
  love: number
  status: number
  userid: string
  username: string
  [property: string]: any
}

export function getForums() {
  return GET<Forum[]>('/forum/forums')
}
