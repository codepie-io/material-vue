<template>
  <div class="md-form__item md-form__item--toggle-input">
    <div :class="[rootClasses, themeClass]" class="md-switch">
      <div class="md-switch__track"></div>
      <div class="md-switch__thumb-underlay">
        <div class="md-switch__thumb">
          <input
            class="md-switch__native-control"
            role="switch"
            type="checkbox"
            v-bind="attributes"
            :value="value"
            :checked="state"
            @change="onChanged_"
            @blur="onBlur_"
            @focus="onFocus_"
          />
        </div>
      </div>
    </div>
    <label :for="uid">
      <slot />
    </label>
  </div>
</template>

<script>
import checkbox from '../../mixins/checkbox'

export default {
  name: 'MdSwitch',
  mixins: [checkbox],
  computed: {
    rootClasses() {
      return [
        {
          'md-switch--checked': this.state,
          'md-switch--focused': this.focused,
          'md-switch--disabled': this.disabled,
          'md-switch--indeterminate': this._indeterminate
        }
      ]
    },
    themeClass() {
      return this.theme ? `md-switch--${this.theme}` : ''
    }
  },
  mounted() {},
  methods: {}
}
</script>
