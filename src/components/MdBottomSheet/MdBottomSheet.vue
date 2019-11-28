<template>
  <transition
    leave-active-class="md-bottom-sheet--animating"
    enter-active-class="md-bottom-sheet--animating"
    enter-to-class="md-bottom-sheet--open"
    leave-class="md-bottom-sheet--open"
    v-on:enter="enter"
    v-on:leave="leave"
    v-on:after-enter="afterEnter"
    v-on:after-leave="afterLeave"
    v-on:before-leave="beforeLeave"
  >
    <aside v-if="show" class="md-bottom-sheet" :class="[rootClasses]">
      <div
        class="md-bottom-sheet__scrim"
        @touchstart="onTouchStart_"
        @touchmove="onTouchMove_"
        @touchend="onTouchEnd_"
        @click="close"
      ></div>
      <div class="md-bottom-sheet__surface">
        <slot />
      </div>
    </aside>
  </transition>
</template>

<script>
export default {
  name: 'MdBottomSheet',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    backdrop: {
      type: Boolean,
      default: true
    },
    keyboard: {
      type: Boolean,
      default: true
    },
    fullscreen: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      shown: false,
      animating: false,
      bottomSheetHeight: 0,
      startTime: 0,
      endTime: 0,
      xDown: 0,
      yDown: 0,
      startY: 0,
      currentY: 0,
      touchingBSheet: false,
      currentXUp: 0,
      currentYUp: 0
    }
  },
  computed: {
    rootClasses() {
      return [
        {
          'md-bottom-sheet--open': this.shown,
          'md-bottom-sheet--animating': this.animating
        }
      ]
    }
  },
  beforeDestroy() {
    document
      .querySelector('body')
      .classList.remove('md-bottom-sheet-scroll-lock')
  },
  methods: {
    open() {
      this.$emit('update:show', true)
    },
    close() {
      this.$emit('update:show', false)
    },
    onTouchStart_(e) {
      if (!this.shown) return
      this.xDown = e.touches[0].clientX
      this.yDown = e.touches[0].clientY
      this.bottomSheetHeight = Math.min(
        this.$el.querySelector('.md-bottom-sheet__surface').clientHeight,
        window.innerHeight
      )
      this.startTime = Math.floor(Date.now())
      this.startY = e.touches[0].pageY
      this.currentY = this.startY
      this.touchingBSheet = true
      requestAnimationFrame(this.updateBottomSheet_.bind(this))
    },
    updateBottomSheet_() {
      if (!this.touchingBSheet) return
      requestAnimationFrame(this.updateBottomSheet_)
      let translateY = Math.min(
        0,
        Math.max(-this.bottomSheetHeight, this.startY - this.currentY)
      )
      let opacityPercentage = 0
      if (Math.abs(translateY) <= this.bottomSheetHeight) {
        opacityPercentage =
          (this.bottomSheetHeight - Math.abs(translateY)) /
          this.bottomSheetHeight
      }
      this.$el.querySelector(
        '.md-bottom-sheet__surface'
      ).style.transform = `translateY(${-translateY}px)`
      this.$el.querySelector(
        '.md-bottom-sheet__scrim'
      ).style.opacity = opacityPercentage
    },
    onTouchMove_(e) {
      this.currentXUp = e.touches[0].clientX
      this.currentYUp = e.touches[0].clientY
      if (!this.touchingBSheet) return
      this.currentY = e.touches[0].pageY
    },
    onTouchEnd_() {
      if (!this.touchingBSheet) return
      this.touchingBSheet = false
      const translateY = Math.min(
        0,
        Math.max(-this.bottomSheetHeight, this.startY - this.currentY)
      )
      this.endTime = Math.floor(Date.now())
      if (!this.xDown || !this.yDown) {
        return
      }
      if (translateY < -(this.bottomSheetHeight / 2)) {
        this.close()
      } else if (translateY) {
        this.$el.querySelector('.md-bottom-sheet__surface').style.transform = ''
        this.$el.querySelector('.md-bottom-sheet__scrim').style.opacity = ''
        this.animating = true
        this.$el
          .querySelector('.md-bottom-sheet__scrim')
          .addEventListener('transitionend', this.onTransitionEnd_)
      }
      this.startTime = 0
      this.endTime = 0
      this.xDown = 0
    },
    onTransitionEnd_() {
      this.animating = false
      if (!this.shown) return
      this.$el
        .querySelector('.md-bottom-sheet__scrim')
        .removeEventListener('transitionend', this.onTransitionEnd_)
    },
    /* transition state */
    enter(el, done) {
      el.querySelector('.md-bottom-sheet__scrim').addEventListener(
        'transitionend',
        () => {
          document
            .querySelector('body')
            .classList.add('md-bottom-sheet-scroll-lock')
          done()
        }
      )
    },
    afterEnter() {
      this.shown = true
    },
    beforeLeave(el) {
      // ...
      el.querySelector('.md-bottom-sheet__surface').style.transform = ''
      el.querySelector('.md-bottom-sheet__scrim').style.opacity = ''
    },
    leave(el, done) {
      el.querySelector('.md-bottom-sheet__scrim').addEventListener(
        'transitionend',
        () => {
          document
            .querySelector('body')
            .classList.remove('md-bottom-sheet-scroll-lock')
          done()
        }
      )
    },
    afterLeave() {
      this.shown = false
    }
  }
}
</script>
