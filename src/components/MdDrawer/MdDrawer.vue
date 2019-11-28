<template>
  <transition
    enter-class="md-drawer--animate"
    enter-active-class="md-drawer--opening"
    enter-to-class="md-drawer--open"
    leave-active-class="md-drawer--animate"
    leave-class="md-drawer--closing"
    leave-to-class=""
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:after-enter="afterEnter"
    v-on:before-leave="beforeLeave"
    v-on:leave="leave"
    v-on:after-leave="afterLeave"
  >
    <aside
      v-if="show && drawerReady"
      class="md-drawer"
      :class="[rootClasses]"
      @keydown="handleKeydown"
    >
      <div
        v-if="enableScrim"
        class="md-drawer__scrim"
        @click="close"
        @touchstart="onTouchStart_"
        @touchmove="onTouchMove_"
        @touchend="onTouchEnd_"
      ></div>
      <div class="md-drawer__surface">
        <slot />
      </div>
    </aside>
  </transition>
</template>

<script>
import { default as createFocusTrap } from 'focus-trap'
import { cssClasses, strings } from './constants'

export default {
  name: 'MdDrawer',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    enableScrim: {
      type: Boolean,
      default: true
    },
    enableSwipe: {
      type: Boolean,
      default: true
    },
    closeOnEsc: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'permanent',
      validator: value => {
        return ['permanent', 'modal', 'dismissible'].indexOf(value) >= 0
      }
    },
    surfaceWidth: {
      type: Number,
      default: 280,
      validator: value => {
        return value > 0 && value < 480
      }
    },
    modalBreakpoint: {
      type: Number,
      default: 600
    }
  },
  data: function() {
    return {
      shown: false,
      animate: false,
      startTime: 0,
      endTime: 0,
      xDown: 0,
      yDown: 0,
      startX: 0,
      currentX: 0,
      touchingDrawer: false,
      currentXUp: 0,
      currentYUp: 0,
      windowWidth: 0,
      previousFocus: null,
      focusTrap: null,
      drawerReady: false
    }
  },
  computed: {
    rootClasses() {
      return [
        {
          'md-drawer--open': this.shown,
          'md-drawer--animate': this.animate,
          'md-drawer--dismissible': this.drawerType === 'dismissible',
          'md-drawer--modal': this.drawerType === 'modal'
        }
      ]
    },
    drawerType() {
      return this.windowWidth >= this.modalBreakpoint ? this.type : 'modal'
    },
    surfaceMaxWidth() {
      return Math.ceil(this.windowWidth * 0.8)
    },
    drawerSurfaceWidth() {
      return Math.min(this.surfaceWidth, this.surfaceMaxWidth)
    }
  },
  beforeMount() {
    this.windowWidth = window.innerWidth
    this.updateCssVariable()
  },
  mounted() {
    this.$nextTick(() => {
      this.drawerReady = true
    })
    window.addEventListener('resize', this.updateWidth.bind(this))
  },
  beforeDestroy() {
    this.removeBodyClass('md-drawer-scroll-lock')
    this.removeBodyClass('body-drawer-opening')
    this.removeBodyClass('body-drawer-closing')
    window.removeEventListener('resize', this.updateWidth)
  },
  methods: {
    open() {
      this.$emit('update:show', true)
    },
    close() {
      this.$emit('update:show', false)
    },
    onTouchStart_(e) {
      if (!this.shown || !this.enableSwipe) return
      this.xDown = e.touches[0].clientX
      this.yDown = e.touches[0].clientY
      this.startTime = Math.floor(Date.now())
      this.startX = e.touches[0].pageX
      this.currentX = this.startX
      this.touchingDrawer = true
      requestAnimationFrame(this.updateDrawer_.bind(this))
    },
    updateDrawer_() {
      if (!this.touchingDrawer) return
      requestAnimationFrame(this.updateDrawer_)
      const translateX = Math.min(0, this.currentX - this.startX)
      let opacityPercentage = 0
      if (Math.abs(translateX) <= this.drawerSurfaceWidth) {
        opacityPercentage =
          (this.drawerSurfaceWidth - Math.abs(translateX)) /
          this.drawerSurfaceWidth
      }
      this.$el.querySelector(
        strings.SURFACE_SELECTOR
      ).style.transform = `translateX(${translateX}px)`
      this.$el.querySelector(
        strings.SCRIM_SELECTOR
      ).style.opacity = opacityPercentage
    },
    onTouchMove_(e) {
      this.currentXUp = e.touches[0].clientX
      this.currentYUp = e.touches[0].clientY
      if (!this.touchingDrawer) return
      this.currentX = e.touches[0].pageX
    },
    onTouchEnd_() {
      if (!this.touchingDrawer) return
      this.touchingDrawer = false
      const translateX = Math.min(0, this.currentX - this.startX)
      this.endTime = Math.floor(Date.now())
      if (!this.xDown || !this.yDown) {
        return
      }
      if (translateX < 0 && translateX < -(this.drawerSurfaceWidth / 2)) {
        this.$el.querySelector(strings.SURFACE_SELECTOR).style.transform = ''
        this.$el.querySelector(strings.SCRIM_SELECTOR).style.opacity = ''
        this.close()
      } else {
        this.$el
          .querySelector(strings.SURFACE_SELECTOR)
          .addEventListener('transitionend', this.onTransitionEnd_.bind(this))
        this.$el.classList.add(cssClasses.OPENING)
        this.$el.classList.add(cssClasses.ANIMATE)
        this.$el.querySelector(strings.SURFACE_SELECTOR).style.transform = ''
        this.$el.querySelector(strings.SCRIM_SELECTOR).style.opacity = ''
      }
      this.startTime = 0
      this.endTime = 0
      this.xDown = 0
    },
    onTransitionEnd_() {
      if (!this.shown) return
      this.$el.classList.remove(cssClasses.OPENING)
      this.$el.classList.remove(cssClasses.ANIMATE)
      this.$el
        .querySelector(strings.SURFACE_SELECTOR)
        .removeEventListener('transitionend', this.onTransitionEnd_)
    },
    /* transition state */
    beforeEnter() {
      document.querySelector('body').classList.add('body-drawer-opening')
    },
    enter(el, done) {
      this.notifyOpening()
      this.startTime = Math.floor(Date.now())
      if (
        this.drawerType === 'permanent' ||
        this.drawerType === 'dismissible'
      ) {
        document.querySelector('body').style.paddingLeft = `${
          this.drawerSurfaceWidth
        }px`
      }
      if (this.drawerType === 'permanent') {
        done()
      } else {
        this.saveFocus()
      }
      el.querySelector(strings.SURFACE_SELECTOR).addEventListener(
        'transitionend',
        () => {
          if (this.type === 'modal') {
            document.querySelector('body').classList.add(cssClasses.SCROLL_LOCK)
          }
          done()
        }
      )
    },
    afterEnter() {
      this.shown = true
      document.querySelector('body').classList.remove('body-drawer-opening')
      this.notifyOpened()
      this.$nextTick(() => {
        this.setFocusTrap()
        this.trapFocus()
        this.focusActiveNavigationItem()
      })
    },
    beforeLeave(el) {
      document.querySelector('body').classList.add('body-drawer-closing')
    },
    leave(el, done) {
      this.notifyClosing()
      this.$el.classList.remove(cssClasses.OPEN)
      this.startTime = Math.floor(Date.now())
      if (
        this.drawerType === 'permanent' ||
        this.drawerType === 'dismissible'
      ) {
        document.querySelector('body').style.paddingLeft = ''
      }
      if (this.drawerType === 'permanent') {
        done()
      }
      el.querySelector(strings.SURFACE_SELECTOR).addEventListener(
        'transitionend',
        () => {
          document
            .querySelector('body')
            .classList.remove('md-drawer-scroll-lock')
          done()
        }
      )
    },
    afterLeave() {
      document.querySelector('body').classList.remove('body-drawer-closing')
      this.releaseFocus()
      this.restoreFocus()
      this.notifyClosed()
      this.shown = false
    },
    trapFocus() {
      this.focusTrap.activate()
    },
    releaseFocus() {
      this.focusTrap.deactivate()
    },
    saveFocus() {
      this.previousFocus = document.activeElement
    },
    restoreFocus() {
      const previousFocus = this.previousFocus
      if (
        previousFocus &&
        previousFocus.focus &&
        document.contains(document.activeElement)
      ) {
        previousFocus.focus()
      }
    },
    focusActiveNavigationItem() {
      const activeNavItemEl = this.$el.querySelector(
        `.${cssClasses.LIST_ITEM_ACTIVATED_CLASS}`
      )
      if (activeNavItemEl) {
        activeNavItemEl.focus()
      }
    },
    setFocusTrap(el) {
      this.focusTrap = createFocusTrap(
        this.$el.querySelector(strings.SURFACE_SELECTOR),
        {
          clickOutsideDeactivates: true,
          escapeDeactivates: false,
          returnFocusOnDeactivate: false,
          includeContainer: true
        }
      )
    },
    clickDefaultButton() {},
    reverseButtons() {},
    notifyOpening() {
      this.$emit(strings.OPENING_EVENT)
    },
    notifyOpened() {
      this.$emit(strings.OPENED_EVENT)
    },
    notifyClosing() {
      this.$emit(strings.CLOSING_EVENT)
    },
    notifyClosed() {
      this.$emit(strings.CLOSED_EVENT)
    },
    updateWidth() {
      this.windowWidth = window.innerWidth
      this.updateCssVariable()
      this.updateBodyPadding()
    },
    updateCssVariable() {
      const root = document.documentElement
      root.style.setProperty(
        '--drawer-surface-width',
        `${this.drawerSurfaceWidth}px`
      )
      root.style.setProperty(
        '--drawer-surface-translate',
        `-${this.drawerSurfaceWidth}px`
      )
    },
    updateBodyPadding() {
      if (
        this.drawerType === 'permanent' ||
        this.drawerType === 'dismissible'
      ) {
        if (this.shown) {
          document.querySelector('body').style.paddingLeft = `${
            this.drawerSurfaceWidth
          }px`
        }
      } else {
        document.querySelector('body').style.paddingLeft = ''
      }
    },
    handleKeydown(e) {
      const { keyCode, key } = e
      const isEscape = key === 'Escape' || keyCode === 27
      if (isEscape && this.closeOnEsc) {
        this.close()
      }
    },
    removeBodyClass(className) {
      document.body.classList.remove(className)
    }
  }
}
</script>
