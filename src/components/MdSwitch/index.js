import MdSwitch from './MdSwitch'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install(Vue) {
    registerComponent(Vue, MdSwitch)
  }
}

use(Plugin)

export default Plugin

export { MdSwitch }
