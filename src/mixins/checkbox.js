export default {
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    uid: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number, Boolean],
      default: null
    },
    trueValue: {
      type: [Boolean, String, Number],
      default: true
    },
    falseValue: {
      type: [Boolean, String, Number],
      default: false
    },
    theme: {
      type: String,
      default: null
    },
    checked: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [Boolean, Array, String, Number],
      default: undefined
    }
  },
  computed: {
    state() {
      if (this.modelValue !== undefined) {
        if (Array.isArray(this.modelValue)) {
          return this.modelValue.indexOf(this.value) > -1
        }

        if (this._trueValue) {
          return this.modelValue === this.trueValue
        }
        return typeof this.modelValue === 'string' ? true : !!this.modelValue
      }

      if (this.localChecked === undefined)
        return typeof this.checked === 'string' ? true : !!this.checked
      else return this.localChecked
    },
    _indeterminate() {
      return typeof this.indeterminate === 'string'
        ? true
        : !!this.indeterminate
    },
    _trueValue() {
      return typeof this.trueValue === 'string'
        ? this.trueValue
        : !!this.trueValue
    },
    _falseValue() {
      return typeof this.falseValue === 'string'
        ? this.falseValue
        : !!this.falseValue
    },
    attributes () {
      return {
        ...this.$attrs,
        type: this.type,
        id: this.uid,
        name: this.name,
        disabled: this.disabled,
        required: this.required,
        readonly: this.readonly
      }
    }
  },
  data: () => ({
    focused: false,
    localChecked: undefined
  }),
  watch: {
    checked(value) {
      this.localChecked = value
    },
    indeterminate(value) {
      this.$refs.input.indeterminate = value
    }
  },
  methods: {
    onBlur_(event) {
      this.focused = false
      this.$emit('blur', event)
    },
    onFocus_(event) {
      this.focused = true
      this.$emit('focus', event)
    },
    onChanged_(event) {
      this.$emit('update:indeterminate', false)

      const isChecked = event.target.checked
      this.localChecked = isChecked

      if (this.modelValue instanceof Array) {
        let newValue = [...this.modelValue]

        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }
        this.$emit('change', newValue)
      } else {
        this.$emit(
          'change',
          isChecked
            ? this._trueValue
              ? this.trueValue
              : true
            : this._falseValue
            ? this.falseValue
            : false
        )
      }
    }
  }
}
