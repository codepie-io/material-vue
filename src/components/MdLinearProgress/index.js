import MdLinearProgress from './MdLinearProgress'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install(Vue) {
    registerComponent(Vue, MdLinearProgress)
  }
}

use(Plugin)

export default Plugin

export { MdLinearProgress }
