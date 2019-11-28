import MdDrawer from './MdDrawer'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install(Vue) {
    registerComponent(Vue, MdDrawer)
  }
}

use(Plugin)

export default Plugin

export { MdDrawer }
