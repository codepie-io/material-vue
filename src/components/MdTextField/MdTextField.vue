<template>
  <div class="md-form__item md-form__item--text-field">
    <div :class="[rootClasses, rootClass]" class="md-text-field">
      <i v-if="leadingIcon" class="material-icons md-text-field__icon">
        {{ leadingIcon }}
      </i>

      <input
        v-if="type !== 'textarea'"
        ref="input"
        v-bind="attributes"
        :value="value"
        :class="inputClass"
        class="md-text-field__input"
        @touchstart="setPointerXOffset_"
        @mousedown="setPointerXOffset_"
        @input="onInput_"
        @blur="onBlur_"
        @focus="onFocus_"
      />

      <textarea
        v-else
        ref="textarea"
        v-bind="attributes"
        :value="value"
        :rows="rows"
        :class="inputClass"
        class="md-text-field__input"
        @input="onInput_"
        @blur="onBlur_"
        @focus="onFocus_"
      />

      <template v-if="outlined">
        <MdNotchedOutline
          :above="dirty || focused"
          :active="dirty || focused"
          :outlined="true"
          :label-class="labelClass"
          :uid="uid"
          :label="label"
        />
      </template>

      <template v-else>
        <label
          :for="uid"
          :class="[labelClasses, labelClass]"
          class="md-floating-label"
          >{{ label }}</label
        >
      </template>

      <i
        v-if="trailingIcon"
        :tabindex="trailingIconTabIndex"
        class="material-icons md-text-field__icon"
        @click="$emit('trailingIconClick')"
      >
        {{ trailingIcon }}
      </i>
      <i
        v-if="leadingIcon"
        :tabindex="leadingIconTabIndex"
        class="material-icons md-text-field__icon"
        @click="$emit('leadingIconClick')"
      >
        {{ leadingIcon }}
      </i>

      <MdLineRipple
        ref="lineRipple"
        v-if="!outlined"
        :active="focused || dirty"
      />
    </div>
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
import MdNotchedOutline from '../MdNotchedOutline/MdNotchedOutline'
import MdInputHelper from '../MdInputHelper/MdInputHelper'
import config from '../../utils/config'
import MdLineRipple from '../MdLineRipple/MdLineRipple'

export default {
  name: 'MdTextField',
  model: {
    prop: 'value',
    event: 'input'
  },
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
    renderButton: {
      type: Boolean,
      default: false
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
      type: [String, Number, Boolean],
      default: null
    },
    outlined: {
      type: Boolean,
      default: true
    },
    pattern: {
      type: String,
      default: null
    },
    rows: {
      type: Number,
      default: 4
    },
    type: {
      type: String,
      default: 'text',
      validator: value => {
        return (
          [
            'date',
            'datetime',
            'datetime-local',
            'email',
            'number',
            'password',
            'search',
            'tel',
            'text',
            'textarea',
            'time',
            'url',
            'week'
          ].indexOf(value) >= 0
        )
      }
    },
    maxlength: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    min: {
      type: Number,
      default: null
    },
    minlength: {
      type: Number,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: () => config.defaultInputAutocomplete
    },
    useHtml5Validation: {
      type: Boolean,
      default: () => config.defaultUseHtml5Validation
    },
    dense: {
      type: Boolean,
      default: false
    },
    loading: {
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
    showCounter: {
      type: Boolean,
      default: () => config.defaultInputHasCounter
    },
    trailingIconClickable: {
      type: Boolean,
      default: false
    },
    leadingIconClickable: {
      type: Boolean,
      default: false
    },
    inputClass: {
      type: String,
      default: null
    },
    labelClass: {
      type: String,
      default: null
    },
    rootClass: {
      type: String,
      default: null
    }
  },
  data: () => ({
    localErrorText: this.errorText,
    valid: true,
    focused: false
  }),
  components: {
    MdLineRipple,
    MdNotchedOutline,
    MdInputHelper
  },
  computed: {
    rootClasses() {
      return [
        {
          'md-text-field--dense': this.dense,
          'md-text-field--outlined': this.outlined,
          'md-text-field--focused': this.focused,
          'md-text-field--invalid': !this.valid || this.invalid,
          'md-text-field--loading': this.loading,
          'md-text-field--dirty': this.dirty,
          'md-text-field--with-trailing-icon': this.trailingIcon,
          'md-text-field--with-leading-icon': this.leadingIcon,
          'md-text-field--textarea': this.type === 'textarea'
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
      if (typeof this.value === 'string') {
        return this.value.length
      } else if (typeof this.value === 'number') {
        return this.value.toString().length
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
    },
    attributes() {
      return {
        ...this.$attrs,
        type: this.type,
        id: this.uid,
        name: this.name,
        disabled: this.disabled,
        required: this.required,
        placeholder: this.placeholder,
        readonly: this.readonly,
        maxlength: this.maxlength,
        minlength: this.minlength,
        max: this.max,
        min: this.min,
        pattern: this.pattern
      }
    }
  },
  watch: {
    errorText(value) {
      this.localErrorText = value
    },
    value() {
      !this.valid && this.checkValidity_()
    }
  },
  methods: {
    onInput_(event) {
      this.$emit('input', event.target.value)
    },
    onBlur_($event) {
      this.focused = false
      this.$emit('blur', $event)
      this.checkValidity_()
    },
    onFocus_($event) {
      this.focused = true
      this.$emit('focus', $event)
    },
    setPointerXOffset_(e) {
      this.setTransformOrigin(e)
    },
    checkValidity_() {
      if (!this.useHtml5Validation) return

      const el = this.$el.querySelector('.md-text-field__input')

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
    setLineRippleTransformOrigin(normalizedX) {
      if (!this.outlined) {
        this.$refs.lineRipple.setRippleCenter(normalizedX)
      }
    },
    setTransformOrigin(e) {
      const touches = e.touches
      const targetEvent = touches ? touches[0] : e
      const targetClientRect = targetEvent.target.getBoundingClientRect()
      const normalizedX = targetEvent.clientX - targetClientRect.left
      this.setLineRippleTransformOrigin(normalizedX)
    }
  }
}
</script>
