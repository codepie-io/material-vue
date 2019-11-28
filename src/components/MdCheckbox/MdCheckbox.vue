<template>
  <div class="md-form__item md-form__item--toggle-input">
    <div :class="[rootClasses, themeClass]" class="md-checkbox">
      <input
        class="md-checkbox__native-control"
        type="checkbox"
        v-bind="attributes"
        :value="value"
        :checked="state"
        @change="onChanged_"
        @blur="onBlur_"
        @focus="onFocus_"
      />
      <div class="md-checkbox__background">
        <svg class="md-checkbox__checkmark" viewBox="0 0 24 24">
          <path
            class="md-checkbox__checkmark__path"
            fill="none"
            stroke="white"
            d="M1.73,12.91 8.1,19.28 22.79,4.59"
          ></path>
        </svg>
        <div class="md-checkbox__mixedmark"></div>
      </div>
    </div>
    <label :for="uid">
      <slot />
    </label>
    <MdInputHelper
      :invalid="!valid || invalid"
      :value-length="valueLength"
      :error-text="localErrorText"
      :show-counter="maxlength && showCounter && type !== 'number'"
      :maxlength="maxlength"
      :persistent="true"
      :helper-text="helperText"
    />
  </div>
</template>

<script>
import checkbox from '../../mixins/checkbox'
import MdInputHelper from '../MdInputHelper/MdInputHelper'

export default {
  name: 'MdCheckbox',
  mixins: [checkbox],
  computed: {
    rootClasses() {
      return [
        {
          'md-checkbox--checked': this.state,
          'md-checkbox--focused': this.focused,
          'md-checkbox--disabled': this.disabled,
          'md-checkbox--indeterminate': this._indeterminate
        }
      ]
    },
    themeClass() {
      return this.theme ? `md-checkbox--${this.theme}` : ''
    }
  },
  components: {
    MdInputHelper
  },
  mounted() {},
  methods: {}
}
</script>
