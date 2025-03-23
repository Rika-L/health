import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { useUserStore } from '@/store/user'
import axios from 'axios'

export interface BaseType<T> {
  code: number
  message: string
  data: T
  [property: string]: any
}

const request = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_BASE_URL,
  adapter: 'fetch',
})

request.interceptors.request.use(requestInterceptor)

request.interceptors.response.use(
  (response) => {
    if (response.data.code === 61004)
      handleNoAuth()
    return response
  },
  // 网络错误处理
  responseErrorInterceptor,
)

// 请求拦截器
function requestInterceptor(config: InternalAxiosRequestConfig) {
  const useStore = useUserStore()
  const token = useStore.token
  token && (config.headers.token = token)
  return config
}

/**
 * @author Rika
 * @desc 错误处理
 * @param {string} message 错误信息
 * @param {number} statusCode 状态码
 */
type HttpStatusErrorHandler = (message: string, statusCode: number) => void
let httpStatusErrorHandler: HttpStatusErrorHandler

// 错误响应拦截器
function responseErrorInterceptor(error: any) {
  console.log(error)
  const message = error?.response?.data?.message
  httpStatusErrorHandler(message ?? 'Unknown error', error.status)
  return Promise.reject(error)
}

function injectHttpStatusErrorHandler(handler: HttpStatusErrorHandler) {
  httpStatusErrorHandler = handler
}

function handleNoAuth() {
  httpStatusErrorHandler('您的登录信息已过期,请重新登录', 401)
}

async function HTTPRequest<T>(config: AxiosRequestConfig) {
  const res = await request<BaseType<T>>(config)
  return res.data
}

async function GET<T>(url: string, config?: AxiosRequestConfig) {
  const res = await request.get<BaseType<T>>(url, config)
  return res.data
}

async function POST<T, K = any>(url: string, data?: K, config?: AxiosRequestConfig) {
  const res = await request.post<BaseType<T>>(url, data, config)
  return res.data
}

export { GET, injectHttpStatusErrorHandler, POST, request }
export default HTTPRequest
