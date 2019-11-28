<template>
  <div
    :style="{ height: collapseHeight }"
    :class="[rootClass, collapsedClass]"
    class="md-collapse"
  >
    <div :id="uid" :aria-expanded="open" class="md-zippy__wrapper">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MdCollapse',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    animation: {
      type: String,
      default: 'collapse'
    },
    uid: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    animating: false,
    collapse: true,
    showBanner: true,
    height: 0,
    localOpen: this.open
  }),
  computed: {
    rootClass() {
      return {
        'md-collapse--animating': this.animating,
        'md-collapse--open': this.open
      }
    },
    collapseHeight() {
      return this.height !== '' ? `${this.height}px` : ''
    },
    collapsedClass() {
      return this.collapse ? 'md-collapse--collapsed' : ''
    }
  },
  watch: {
    open(value) {
      if (this.localOpen !== value) {
        this.toggle()
      }
    }
  },
  methods: {
    /**
     * Toggle and emit events
     */
    toggle() {
      this.localOpen ? this.hide() : this.show()
    },

    show() {
      if (this.animating) {
        return
      }
      this.collapse = false
      requestAnimationFrame(() => {
        this.animating = true
        this.height = 0
        this.setHeight()
        setTimeout(() => {
          this.animating = false
          this.localOpen = true
          this.height = ''
          this.$emit('open')
        }, 350)
      })
    },

    hide() {
      if (this.animating) {
        return
      }
      this.animating = true
      this.setHeight()
      requestAnimationFrame(() => {
        this.height = 0
        setTimeout(() => {
          this.animating = false
          this.localOpen = false
          this.collapse = true
          this.$emit('close')
        }, 350)
      })
    },

    setHeight() {
      this.height = this.$el.querySelector('.md-zippy__wrapper').offsetHeight
    }
  }
}
</script>
