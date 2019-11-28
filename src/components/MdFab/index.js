import MdFab from './MdFab'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install(Vue) {
    registerComponent(Vue, MdFab)
  }
}

use(Plugin)

export default Plugin

export { MdFab }
