import type { ElPagination, ElTable, ElTableColumn } from 'element-plus'
import type { FormItem } from '../form/types'

export interface UseTableOptions {
  searchItems?: FormItem[]
  columns: (InstanceType<typeof ElTableColumn>['$props'] & {
    slots?: Record<string, (...args: any[]) => JSX.Element | null>
    render?: (...args: any[]) => JSX.Element | null
  })[]
  request: (params: any) => Promise<ResResult<any> | any>
  tableProps?: InstanceType<typeof ElTable>['$props']
  pagination?: boolean
  paginationProps?: InstanceType<typeof ElPagination>['$props']
  slots?: Record<'toolbar', () => JSX.Element | null>
  adaptive?: boolean
  debounceWait?: number
  loadingWait?: number
  manual?: boolean
}

// 接口返回数据结构
export interface ResResult<T> {
  list: T
  total: number
}
