import MdNotchedOutline from './MdNotchedOutline'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install(Vue) {
    registerComponent(Vue, MdNotchedOutline)
  }
}

use(Plugin)

export default Plugin

export { MdNotchedOutline }
