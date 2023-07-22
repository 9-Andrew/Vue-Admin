import request from '@/utils/request'
import type { TrademarkResponse } from './type'

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
}

export const reqTrademarkList = (page: number, limit: number) =>
  request<any, TrademarkResponse>(API.TRADEMARK_URL + `${page}/${limit}`)
