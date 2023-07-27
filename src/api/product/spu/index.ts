import request from '@/utils/request'
import type { SPUResponse } from './type'

enum API {
  SPU_URL = '/admin/product/',
}

export const reqSPU = (page: number, limit: number, c3ID: number | string) =>
  request<any, SPUResponse>(
    API.SPU_URL + `${page}/${limit}?category3Id=${c3ID}`,
  )
