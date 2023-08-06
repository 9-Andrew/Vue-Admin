import request from '@/utils/request'
import type {
  SPUResponse,
  AllTrademarkResponse,
  SPUImageListResponse,
  SPUSaleAttrListResponse,
  HasSaleAttrResponse,
  SPU,
} from './type'

enum API {
  SPU_URL = '/admin/product/',
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  SPUIMAGELIST_URL = '/admin/product/spuImageList/',
  SPUSALEATTRLIST_URL = '/admin/product/spuSaleAttrList/',
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
  SAVESKU_URL = '/admin/product/saveSkuInfo',
  SKULIST_URL = '/admin/product/findBySpuId/',
}

export const reqSPU = (page: number, limit: number, c3ID: number | string) =>
  request<any, SPUResponse>(
    API.SPU_URL + `${page}/${limit}?category3Id=${c3ID}`,
  )
export const reqAllTradmark = () =>
  request<any, AllTrademarkResponse>(API.ALLTRADEMARK_URL)
export const reqSPUImageList = (id: number) =>
  request<any, SPUImageListResponse>(API.SPUIMAGELIST_URL + `${id}`)
export const reqSPUSaleAttrList = (id: number) =>
  request<any, SPUSaleAttrListResponse>(API.SPUSALEATTRLIST_URL + `${id}`)
export const reqAllSaleAttr = () =>
  request<any, HasSaleAttrResponse>(API.ALLSALEATTR_URL)
export const reqAddOrUPdateSPU = (spu: SPU) => {
  if (!spu.id) {
    return request<any, any>({ method: 'post', url: API.ADDSPU_URL, data: spu })
  } else {
    return request.post<any, any>(API.UPDATESPU_URL, spu)
  }
}
export const reqSaveSKU = (data: any) =>
  request.post<any, any>(API.SAVESKU_URL, data)
export const reqSKUList = (id: number | string) =>
  request<any, any>(API.SKULIST_URL + id)
