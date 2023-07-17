import SvgIcon from './SvgIcon.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const components = { SvgIcon }

export default {
  install(app: any) {
    Object.keys(components).forEach((key) => {
      app.component(key, Reflect.get(components, key))
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
