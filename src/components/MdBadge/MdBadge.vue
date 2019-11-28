<template>
  <component
    class="md-badge"
    :is="tag"
    :class="[themeClass, { 'md-badge--overlap': overlap }]"
  >
    <span class="md-badge__content">
      <slot />
    </span>
  </component>
</template>
<script>
export default {
  name: 'MdBadge',
  props: {
    tag: {
      type: String,
      default: 'span',
      validator: value => {
        return ['div', 'span'].indexOf(value) >= 0
      }
    },
    theme: {
      type: String,
      default: 'primary'
    },
    overlap: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'top',
      validator(position) {
        return ['top', 'bottom'].indexOf(position) > -1
      }
    }
  },
  computed: {
    themeClass() {
      return `md-badge--${this.theme}`
    }
  }
}
</script>
