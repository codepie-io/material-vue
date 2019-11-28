import MdDialog from './MdDialog'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install(Vue) {
    registerComponent(Vue, MdDialog)
  }
}

use(Plugin)

export default Plugin

export { MdDialog }
