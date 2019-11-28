<template>
  <component
    :is="tag"
    class="md-fab"
    :type="nativeType"
    :class="[
      sizeClass,
      toggleClass,
      themeClass,
      {
        'md-fab--active': active,
        'md-fab--extended': extended && label
      }
    ]"
    @click="$emit('click', $event)"
  >
    <span
      v-if="renderTrailingIcon"
      :class="[iconPositionClass]"
      class="md-fab__icon material-icons"
      >{{ icon }}</span
    >
    <span v-if="label && extended" class="md-fab__label">{{ label }}</span>
    <span
      v-if="renderLeadingIcon"
      :class="[iconPositionClass]"
      class="md-fab__icon material-icons"
      >{{ icon }}</span
    >
  </component>
</template>

<script>
export default {
  name: 'MdFab',
  props: {
    theme: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: null
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
    },
    iconPosition: {
      type: String,
      default: 'trailing'
    },
    label: {
      type: String,
      default: null
    },
    extended: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    rootClasses() {
      return [
        {
          'md-fab--dense': this.dense
        }
      ]
    },
    sizeClass() {
      return this.size ? `md-fab--${this.size}` : ''
    },
    themeClass() {
      return this.theme ? `md-fab--${this.theme}` : ''
    },
    toggleClass() {
      return this.toggle ? 'md-fab--on' : ''
    },
    iconPositionClass() {
      return this.iconPosition === 'leading'
        ? 'md-fab__icon--leading'
        : 'md-fab__icon--trailing'
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
