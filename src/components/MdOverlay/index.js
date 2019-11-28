import MdOverlay from './MdOverlay'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install(Vue) {
    registerComponent(Vue, MdOverlay)
  }
}

use(Plugin)

export default Plugin

export { MdOverlay }
