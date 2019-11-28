<template>
  <div class="md-overlay" :class="[rootClasses]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MdOverlay',
  props: {
    show: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: true
    },
    cover: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    rootClasses() {
      return [
        {
          'md-overlay--visible': this.show,
          'md-overlay--fixed': this.fixed,
          'md-overlay--center': this.center,
          'md-overlay--cover': this.cover
        }
      ]
    }
  },
  methods: {
    open() {
      this.$emit('update:show', true)
    },
    close() {
      this.$emit('update:show', false)
    }
  }
}
</script>
