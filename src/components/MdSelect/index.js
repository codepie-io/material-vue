import MdSelect from './MdSelect'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install(Vue) {
    registerComponent(Vue, MdSelect)
  }
}

use(Plugin)

export default Plugin

export { MdSelect }
