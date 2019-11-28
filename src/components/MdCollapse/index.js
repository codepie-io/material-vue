import MdCollapse from './MdCollapse'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install(Vue) {
    registerComponent(Vue, MdCollapse)
  }
}

use(Plugin)

export default Plugin

export { MdCollapse }
