<template>
  <div class="md-form__item">
    <div :class="rootClasses" class="md-select">
      <i v-if="leadingIcon" class="material-icons md-select__icon">
        {{ leadingIcon }}
      </i>

      <select
        class="md-select__native-control"
        :size="nativeSize"
        :id="uid"
        v-if="native"
        v-model="computedValue"
        @blur="onBlur_"
        @focus="onFocus_"
      >
        <option
          v-for="option in options"
          :key="option.value"
          v-bind:value="option.value"
        >
          {{ option.option }}
        </option>
      </select>

      <template v-else>
        <div
          :id="uid"
          role="button"
          aria-haspopup="listbox"
          aria-labelledby="outlined_enhanced outlined_enhanced-label"
          class="md-select__selected-text"
          tabindex="0"
          aria-expanded="true"
        >
          {{ computedOption }}
        </div>
        <input
          type="hidden"
          class="md-select__hidden-input"
          :required="required"
          v-model="computedValue"
        />
      </template>

      <template v-if="outline">
        <MdNotchedOutline
          :above="dirty || focused"
          :active="dirty || focused"
          :outline="true"
          :uid="uid"
          :label="label"
        />
      </template>

      <template v-else>
        <label :for="uid" :class="labelClasses" class="md-floating-label">{{
          label
        }}</label>
      </template>

      <i class="material-icons md-select__dropdown-icon">arrow_drop_down</i>

      <div v-if="!outline" class="md-line-ripple" />
    </div>
    <MdInputHelper
      :invalid="!valid || invalid"
      :value-length="valueLength"
      :error-text="localErrorText"
      :persistent="true"
      :helper-text="helperText"
    />
  </div>
</template>

<script>
import MdNotchedOutline from '../MdNotchedOutline/MdNotchedOutline'
import MdInputHelper from '../MdInputHelper/MdInputHelper'
import config from '../../utils/config'

export default {
  name: 'MdSelect',
  props: {
    uid: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    helperText: {
      type: String,
      default: null
    },
    errorText: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    native: {
      type: Boolean,
      default: true
    },
    invalid: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: null
    },
    value: {
      type: [String, Number, Boolean, Object, Array, Function],
      default: null
    },
    options: {
      type: [Array, Function],
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    nativeSize: {
      type: [String, Number],
      default: null
    },
    outline: {
      type: Boolean,
      default: true
    },
    required: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    useHtml5Validation: {
      type: Boolean,
      default: () => config.defaultUseHtml5Validation
    },
    dense: {
      type: Boolean,
      default: false
    },
    leadingIcon: {
      type: String,
      default: null
    },
    trailingIcon: {
      type: String,
      default: null
    },
    trailingIconClickable: {
      type: Boolean,
      default: false
    },
    leadingIconClickable: {
      type: Boolean,
      default: false
    },
    resultsDisplay: {
      type: [String, Function],
      default: 'value'
    },
    optionsDisplay: {
      type: [String, Function],
      default: 'option'
    }
  },
  data: () => ({
    selected: this.value,
    localErrorText: this.errorText,
    valid: true,
    focused: false
  }),
  components: {
    MdNotchedOutline,
    MdInputHelper
  },
  computed: {
    computedValue: {
      get() {
        return this.selected
      },
      set(value) {
        this.selected = value
        this.$emit('input', value)
        !this.valid && this.checkValidity_()
      }
    },
    computedOption() {
      let index = this.options.findIndex(item => {
        return item.value === this.computedValue
      })
      if (index !== -1) {
        return this.options[index].option
      } else {
        return null
      }
    },
    rootClasses() {
      return [
        {
          'md-select--dense': this.dense,
          'md-select--outlined': this.outline,
          'md-select--focused': this.focused,
          'md-select--invalid': !this.valid || this.invalid,
          'md-select--loading': this.loading,
          'md-select--dirty': this.dirty,
          'md-select--with-trailing-icon': this.trailingIcon,
          'md-select--with-leading-icon': this.leadingIcon,
          'md-select--textarea': this.type === 'textarea'
        }
      ]
    },
    labelClasses() {
      return [
        {
          'md-floating-label--float-above': this.dirty || this.focused
        }
      ]
    },
    valueLength() {
      if (typeof this.selected === 'string') {
        return this.computedValue.length
      } else if (typeof this.computedValue === 'number') {
        return this.computedValue.toString().length
      }
      return 0
    },
    dirty() {
      return this.valueLength !== 0
    },
    trailingIconTabIndex() {
      return this.trailingIconClickable ? '-1' : false
    },
    leadingIconTabIndex() {
      return this.leadingIconClickable ? '-1' : false
    }
  },
  watch: {
    value(value) {
      this.selected = value
      !this.invalid && this.checkValidity_()
    },
    errorText(value) {
      this.localErrorText = value
    }
  },
  methods: {
    onInput_(event) {
      this.$nextTick(() => {
        if (event.target) {
          this.computedValue = event.target.value
        }
      })
    },
    onBlur_($event) {
      this.focused = false
      this.$emit('blur', $event)
      this.checkValidity_()
    },
    onFocus_() {
      this.focused = true
    },
    checkValidity_() {
      if (!this.useHtml5Validation) return

      const el = this.native
        ? this.$el.querySelector('.md-select__native-control')
        : this.$el.querySelector('.md-select__hidden-input')

      let errorMessage = null
      let valid = true

      if (!el.checkValidity()) {
        errorMessage = el.validationMessage
        valid = false
        this.$nextTick(() => {
          if (!this.errorText && !this.valid) {
            this.localErrorText = errorMessage
          }
        })
      }

      this.valid = valid

      return this.valid
    },
    /**
     * Opens the menu.
     */
    openMenu() {},
    /**
     * Closes the menu.
     */
    closeMenu() {},
    /**
     * Emits a change event when an element is selected.
     */
    notifyChange() {}
  }
}
</script>
