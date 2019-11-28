<template>
  <component
    :is="tag"
    class="md-icon-button"
    :type="nativeType"
    :class="[
      sizeClass,
      toggleClass,
      themeClass,
      {
        'md-icon-button--active': active
      }
    ]"
    @click="$emit('click', $event)"
  >
    <span class="md-icon-button__icon material-icons">{{ icon }}</span>
    <span
      v-if="toggleIcon"
      class="md-icon-button__icon md-icon-button__icon--on material-icons"
      >{{ toggleIcon }}</span
    >
  </component>
</template>

<script>
export default {
  name: 'MdIconButton',
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
      required: true
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
    toggle: {
      type: Boolean,
      default: false
    },
    toggleIcon: {
      type: String,
      default: null
    }
  },
  computed: {
    rootClasses() {
      return [
        {
          'md-icon-button--dense': this.dense
        }
      ]
    },
    sizeClass() {
      return this.size ? `md-icon-button--${this.size}` : ''
    },
    themeClass() {
      return this.theme ? `md-icon-button--${this.theme}` : ''
    },
    toggleClass() {
      return this.toggle ? 'md-icon-button--on' : ''
    }
  }
}
</script>
