import MdAvatar from './MdAvatar'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install(Vue) {
    registerComponent(Vue, MdAvatar)
  }
}

use(Plugin)

export default Plugin

export { MdAvatar }
