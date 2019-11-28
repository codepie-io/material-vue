import MdTextField from './MdTextField'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install(Vue) {
    registerComponent(Vue, MdTextField)
  }
}

use(Plugin)

export default Plugin

export { MdTextField }
