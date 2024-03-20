import type { App } from 'vue'
import type { Meta2d } from '@meta2d/core'

export {}
declare global {
  const meta2d: Meta2d
  const C2S: any

  type UserModule = (app: App) => void

  type AppContext = App

  interface AnyObject {
    [key: string]: unknown
  }

  interface Result<T = any> {
    code: number
    data: T
    message?: string
  }

  interface PageData<T = any> {
    [key: string]: unknown
    records: T[]
    total: number
  }

  interface Pagination {
    current: number
    pageSize: number
    total?: number
  }

  type GeneratePageResult<T> = Result<PageData<T>>

  /**
   * HTTP
   */

  type T = AnyObject | AnyObject[] | any

  interface HttpParams extends AnyObject {
    params?: T
  }

  interface GetParams extends HttpParams {}

  interface PostParams extends HttpParams {
    body?: T
  }

  interface PutParams extends HttpParams {
    body?: T
  }

  interface DeleteParams extends HttpParams {}

  /**
   * Tab
   */
  interface Tab {
    id: number
    title: string
    name: string
    icon?: string
    path: string
    cached?: boolean
  }

}
