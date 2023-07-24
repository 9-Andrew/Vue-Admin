import { defineStore } from 'pinia'
import type { SettingState } from './type/type'

const useLayoutSettingStore = defineStore('setting', {
  state(): SettingState {
    return { fold: Boolean(localStorage.getItem('isFold')), refresh: false }
  },
  actions: {
    changeFold() {
      this.fold = !this.fold
      this.fold
        ? localStorage.setItem('isFold', 'true')
        : localStorage.removeItem('isFold')
    },
  },
})
export default useLayoutSettingStore
