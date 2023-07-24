import request from '@/utils/request'
import type { CategoryResponse, AttrResponse, Attr } from './type'

type ID = string | number
enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
  ATTR_URL = '/admin/product/attrInfoList/',
  SAVEATTR_URL = '/admin/product/saveAttrInfo',
}

export const reqC1 = () => request<any, CategoryResponse>(API.C1_URL)
export const reqC2 = (c1: ID) => request<any, CategoryResponse>(API.C2_URL + c1)
export const reqC3 = (c2: ID) => request<any, CategoryResponse>(API.C3_URL + c2)
export const reqAttr = (c1: ID, c2: ID, c3: ID) =>
  request<any, AttrResponse>(API.ATTR_URL + `${c1}/${c2}/${c3}`)
export const reqAddOrUpadateAttr = (data: Attr) =>
  request.post<any, any>(API.SAVEATTR_URL, data)
