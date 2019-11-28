import MdCheckbox from './MdCheckbox'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install(Vue) {
    registerComponent(Vue, MdCheckbox)
  }
}

use(Plugin)

export default Plugin

export { MdCheckbox }
