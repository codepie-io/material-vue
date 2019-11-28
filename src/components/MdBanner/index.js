import MdBanner from './MdBanner'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install(Vue) {
    registerComponent(Vue, MdBanner)
  }
}

use(Plugin)

export default Plugin

export { MdBanner }
