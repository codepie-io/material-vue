import MdBadge from './MdBadge'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install(Vue) {
    registerComponent(Vue, MdBadge)
  }
}

use(Plugin)

export default Plugin

export { MdBadge }
