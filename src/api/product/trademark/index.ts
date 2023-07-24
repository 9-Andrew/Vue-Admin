import request from '@/utils/request'
import type { TrademarkResponse, Trademark } from './type'

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  DELETETRADEMARK_URL = '/admin/product/baseTrademark/remove',
}

export const reqTrademarkList = (page: number, limit: number) =>
  request<any, TrademarkResponse>(API.TRADEMARK_URL + `${page}/${limit}`)
export const reqAddOrUpdateTrademark = (data: Trademark) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}
export const reqDeleteTrademark = (id: number) =>
  request.delete<any, any>(API.DELETETRADEMARK_URL + `/${id}`)
