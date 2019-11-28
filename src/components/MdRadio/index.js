import MdRadio from './MdRadio'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install(Vue) {
    registerComponent(Vue, MdRadio)
  }
}

use(Plugin)

export default Plugin

export { MdRadio }
