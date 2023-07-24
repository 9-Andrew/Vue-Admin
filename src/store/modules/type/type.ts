import { RouteRecordRaw } from 'vue-router'
import type { User } from '@/api/user/type'
import type { Category } from '@/api/product/attr/type'

export interface SettingState {
  fold: boolean | string
  refresh: boolean
}
export interface UserState {
  TOKEN: string | null
  menuRoutes: RouteRecordRaw[]
  userInfo: User
}
export interface CategoryState {
  C1List: Category[]
  C1ID: number | string
  C2List: Category[]
  C2ID: number | string
  C3List: Category[]
  C3ID: number | string
}
