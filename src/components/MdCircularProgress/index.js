import MdCircularProgress from './MdCircularProgress'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install(Vue) {
    registerComponent(Vue, MdCircularProgress)
  }
}

use(Plugin)

export default Plugin

export { MdCircularProgress }
