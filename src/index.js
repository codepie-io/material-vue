import * as components from './components'

import config, { setOptions } from './utils/config'
import { use, registerComponentProgrammatic } from './utils/plugins'

const Material = {
  install(Vue, options = {}) {
    // Options
    setOptions(Object.assign(config, options))
    // Components
    for (let componentKey in components) {
      Vue.use(components[componentKey])
    }
    // Config component
    const CodePieProgrammatic = {
      setOptions(options) {
        setOptions(Object.assign(config, options))
      }
    }
    registerComponentProgrammatic(Vue, '$pie', CodePieProgrammatic)
  }
}

use(Material)

export default Material
