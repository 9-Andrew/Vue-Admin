import request from '@/utils/request'
import type { CategoryResponse } from './type'

enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
}

export const reqC1 = () => request<any, CategoryResponse>(API.C1_URL)
export const reqC2 = (c1: number | string) =>
  request<any, CategoryResponse>(API.C2_URL + c1)
export const reqC3 = (c2: number | string) =>
  request<any, CategoryResponse>(API.C3_URL + c2)
