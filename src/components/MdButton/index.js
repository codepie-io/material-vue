import MdButton from './MdButton'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install(Vue) {
    registerComponent(Vue, MdButton)
  }
}

use(Plugin)

export default Plugin

export { MdButton }
