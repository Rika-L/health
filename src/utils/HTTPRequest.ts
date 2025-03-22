import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

export interface BaseType<T> {
  code: number
  message: string
  data: T
}

const request = axios.create({
  baseURL: import.meta.env.PUBLIC_URL ?? '',
  adapter: 'fetch',
})

// 应用请求拦截器
request.interceptors.request.use(requestInterceptor)

// 应用响应拦截器
request.interceptors.response.use(
  // 正常响应处理
  response => response,
  // 网络错误处理
  responseErrorInterceptor,
)

// 请求拦截器
function requestInterceptor(config: InternalAxiosRequestConfig) {
  // TODO: 获取token
  const token = ''
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
  const { message } = error.response.data
  httpStatusErrorHandler(message ?? 'Unknown error', error.status)
  return Promise.reject(error)
}

function injectHttpStatusErrorHandler(handler: HttpStatusErrorHandler) {
  httpStatusErrorHandler = handler
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
