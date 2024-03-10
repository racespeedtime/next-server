export interface LoginUser {
  username: string
  password: string | number
}

export interface CustomAxiosRequest {
  get<T = any>(url: string, params?: object): Promise<T>
  post<T = any>(url: string, data?: object): Promise<T>
  patch<T = any>(url: string, data?: object): Promise<T>
  put<T = any>(url: string, data?: object): Promise<T>
  delete<T = any>(url: string): Promise<T>
  upload<T = any>(url: string, params?: object): Promise<T>
}


export interface CustomAxiosResponse<T> {
  code: number
  message: string | string[]
  data: T
}
