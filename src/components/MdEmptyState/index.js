import MdEmptyState from './MdEmptyState'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install(Vue) {
    registerComponent(Vue, MdEmptyState)
  }
}

use(Plugin)

export default Plugin

export { MdEmptyState }
