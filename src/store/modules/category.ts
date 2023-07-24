import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr/index'
import type { CategoryResponse } from '@/api/product/attr/type'
import type { CategoryState } from './type/type'

const useCategoryStore = defineStore('category', {
  state(): CategoryState {
    return {
      C1List: [],
      C1ID: '',
      C2List: [],
      C2ID: '',
      C3List: [],
      C3ID: '',
    }
  },
  actions: {
    async getC1() {
      const result: CategoryResponse = await reqC1()
      if (result.code == 200) {
        this.C1List = result.data
      }
    },
    async getC2() {
      const result: CategoryResponse = await reqC2(this.C1ID)
      if (result.code == 200) {
        this.C2List = result.data
      }
    },
    async getC3() {
      const result: CategoryResponse = await reqC3(this.C2ID)
      if (result.code == 200) {
        this.C3List = result.data
      }
    },
  },
})

export default useCategoryStore
