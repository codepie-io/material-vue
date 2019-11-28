<template>
  <component
    :is="tag"
    class="md-button"
    :type="nativeType"
    :disabled="disabled"
    :class="[
      sizeClass,
      themeClass,
      {
        'md-button--disabled': disabled,
        'md-button--loading': loading,
        'md-button--outlined': outlined,
        'md-button--raised': raised,
        'md-button--unelevated': unElevated,
        'md-button--active': active
      }
    ]"
    @click="$emit('click', $event)"
  >
    <span v-if="renderLeadingIcon" class="md-button__icon material-icons">{{
      icon
    }}</span>
    <span class="md-button__label" v-if="label && !loading">{{ label }}</span>
    <span v-else-if="$slots.default && !loading">
      <slot />
    </span>
    <span
      v-if="renderTrailingIcon"
      class="md-button__icon md-button__icon--trailing material-icons"
      >{{ icon }}</span
    >
    <span v-if="loading" class="md-button__overlay">
      <slot name="loader">
        Loading...
      </slot>
    </span>
  </component>
</template>

<script>
export default {
  name: 'MdButton',
  props: {
    theme: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null
    },
    iconPosition: {
      type: String,
      default: 'trailing'
    },
    icon: {
      type: String,
      default: null
    },
    raised: {
      type: Boolean,
      default: false
    },
    unElevated: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: null
    },
    nativeType: {
      type: String,
      default: 'button',
      validator: value => {
        return ['button', 'submit', 'reset'].indexOf(value) >= 0
      }
    },
    tag: {
      type: String,
      default: 'button',
      validator: value => {
        return ['button', 'a', 'input'].indexOf(value) >= 0
      }
    }
  },
  computed: {
    rootClasses() {
      return [
        {
          'md-button--dense': this.dense
        }
      ]
    },
    sizeClass() {
      return this.size ? `md-button--${this.size}` : ''
    },
    themeClass() {
      return this.theme ? `md-button--${this.theme}` : ''
    },
    renderTrailingIcon() {
      return this.icon && this.iconPosition === 'trailing'
    },
    renderLeadingIcon() {
      return this.icon && this.iconPosition !== 'trailing'
    }
  }
}
</script>
