import { defineStore } from 'pinia'
const useLayoutSettingStore = defineStore('setting', {
  state() {
    return { fold: Boolean(localStorage.getItem('isFold')) }
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
