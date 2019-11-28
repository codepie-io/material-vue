<template>
  <div class="md-form__item md-form__item--toggle-input">
    <div :class="[rootClasses, themeClass]" class="md-radio">
      <input
        class="md-radio__native-control"
        type="radio"
        :id="uid"
        :name="name"
        :value="value"
        :checked="state"
        :required="required"
        :disabled="disabled"
        @change="onChanged"
        @blur="onBlur_"
        @focus="onFocus_"
      />
      <div class="md-radio__background">
        <div class="md-radio__outer-circle"></div>
        <div class="md-radio__inner-circle"></div>
      </div>
    </div>
    <label :for="uid">
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  name: 'MdRadio',
  model: {
    prop: 'modelValue',
    event: 'input'
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
      type: [String, Number],
      default: ''
    },
    theme: {
      type: String,
      default: null
    },
    checked: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [String, Number],
      default: undefined
    }
  },
  computed: {
    rootClasses() {
      return [
        {
          'md-radio--focused': this.focused,
          'md-radio--disabled': this.disabled
        }
      ]
    },
    themeClass() {
      return this.theme ? `md-radio--${this.theme}` : ''
    },
    state() {
      if (this.modelValue === undefined) {
        return this.checked
      }
      return this.modelValue === this.value
    }
  },
  data: () => ({
    focused: false
  }),
  watch: {
    checked(newValue) {
      if (newValue !== this.state) {
        this.toggle()
      }
    }
  },
  mounted() {
    if (this.checked && !this.state) {
      this.toggle()
    }
  },
  methods: {
    onBlur_($event) {
      this.focused = false
      this.$emit('blur', $event)
    },
    onFocus_($event) {
      this.focused = true
      this.$emit('focus', $event)
    },
    onChanged($event) {
      this.focused = true
      this.toggle()
    },
    toggle() {
      this.$emit('input', this.state ? '' : this.value)
    }
  }
}
</script>
