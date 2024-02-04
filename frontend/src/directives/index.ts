import type { App } from 'vue'
import { ElLoadingDirective } from 'element-plus'
import auth from './modules/auth'
import waterMarker from './modules/waterMarker'
import draggable from './modules/draggable'
import adaptive from './modules/adaptive'

const directivesList: any = {
  auth,
  waterMarker,
  draggable,
  adaptive,
  // element-ui
  loading: ElLoadingDirective,
}

const directives = {
  install(app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      app.directive(key, directivesList[key])
    })
  },
}

export default directives
