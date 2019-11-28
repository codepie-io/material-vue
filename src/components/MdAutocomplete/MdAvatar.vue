<template>
  <component class="md-avatar" :is="tag" :class="[sizeClass, themeClass]">
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      <i v-if="icon" class="md-avatar__icon material-icons"> {{ icon }}</i>
      <img v-if="imgSrc" class="md-avatar__img" :src="imgSrc" />
    </template>
  </component>
</template>
<script>
export default {
  name: 'MdAvatar',
  props: {
    tag: {
      type: String,
      default: 'div',
      validator: value => {
        return ['div', 'span', 'a'].indexOf(value) >= 0
      }
    },
    theme: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    imgSrc: {
      type: String,
      default: null
    }
  },
  computed: {
    sizeClass() {
      return this.size ? `md-avatar--${this.size}` : ''
    },
    themeClass() {
      return this.theme ? `md-avatar--${this.theme}` : ''
    }
  }
}
</script>
