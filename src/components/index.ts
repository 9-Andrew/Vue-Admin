import SvgIcon from './SvgIcon.vue'

const components = { SvgIcon }

export default {
  install(app: any) {
    Object.keys(components).forEach((key) => {
      app.component(key, Reflect.get(components, key))
    })
  },
}
