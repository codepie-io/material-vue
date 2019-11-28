import MdIconButton from './MdIconButton'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install(Vue) {
    registerComponent(Vue, MdIconButton)
  }
}

use(Plugin)

export default Plugin

export { MdIconButton }
