import MdInputHelper from './MdInputHelper'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install(Vue) {
    registerComponent(Vue, MdInputHelper)
  }
}

use(Plugin)

export default Plugin

export { MdInputHelper }
