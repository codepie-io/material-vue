import MdBottomSheet from './MdBottomSheet'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install(Vue) {
    registerComponent(Vue, MdBottomSheet)
  }
}

use(Plugin)

export default Plugin

export { MdBottomSheet }
