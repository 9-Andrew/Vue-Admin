import useUserStore from '@/store/modules/user'

export const has = (app: any) => {
  app.directive('has', {
    mounted: (el: any, option: any) => {
      const store = useUserStore()
      if (!store.userInfo.buttons.includes(option.value)) {
        el.parentNode.removeChild(el)
      }
    },
  })
}
