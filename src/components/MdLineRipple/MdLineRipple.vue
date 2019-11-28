<template>
  <div
    :class="rootClasses"
    class="md-line-ripple"
    @transitionend="onTransitionEnd_"
  ></div>
</template>

<script>
export default {
  name: 'MdLineRipple',
  props: {
    active: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    rootClasses() {
      return {
        'md-line-ripple--active': this.isActive,
        'md-line-ripple--deactivating': this.isDeactivating
      }
    }
  },
  watch: {
    active: {
      immediate: false,
      handler(value) {
        if (value) {
          this.activate()
        } else {
          this.deactivate()
        }
      }
    }
  },
  data: function() {
    return {
      isDeactivating: false,
      isActive: false
    }
  },
  methods: {
    activate() {
      this.isDeactivating = false
      this.isActive = true
    },
    deactivate() {
      this.isDeactivating = true
    },
    setRippleCenter(xCoordinate) {
      this.$el.style.transformOrigin = `${xCoordinate}px center`
    },
    onTransitionEnd_(e) {
      if (e.propertyName === 'opacity' && this.isDeactivating) {
        this.isActive = false
        this.isDeactivating = false
      }
    }
  }
}
</script>
