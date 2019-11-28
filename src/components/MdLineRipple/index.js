import MdLineRipple from './MdLineRipple'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install(Vue) {
    registerComponent(Vue, MdLineRipple)
  }
}

use(Plugin)

export default Plugin

export { MdLineRipple }
