import request from '@/utils/request'

enum API {
  SKU_URL = '/admin/product/list/',
  ONSALE_URL = '/admin/product/onSale/',
  CANCLESALE_URL = '/admin/product/cancelSale/',
  SKUINFO_URL = '/admin/product/getSkuInfo/',
  DELETESKU_URL = '/admin/product/deleteSku/',
}

export const reqSKUList = (pageNo: number, limit: number) =>
  request<any, any>(API.SKU_URL + pageNo + '/' + limit)
export const reqOnSale = (SKUId: number) =>
  request<any, any>(API.ONSALE_URL + SKUId)
export const reqCancleSale = (SKUId: number) =>
  request<any, any>(API.CANCLESALE_URL + SKUId)
export const reqSKUInfo = (SKUId: number) =>
  request<any, any>(API.SKUINFO_URL + SKUId)
export const reqDeleteSKU = (SKUId: number) =>
  request.delete<any, any>(API.DELETESKU_URL + SKUId)
