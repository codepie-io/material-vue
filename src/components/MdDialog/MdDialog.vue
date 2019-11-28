<template>
  <transition
    leave-active-class="md-dialog--closing"
    enter-active-class="md-dialog--opening"
    enter-to-class="md-dialog--open"
    leave-class="md-dialog--open"
    v-on:enter="enter"
    v-on:leave="leave"
    v-on:after-enter="afterEnter"
    v-on:after-leave="afterLeave"
    v-on:before-leave="beforeLeave"
  >
    <aside
      v-if="show && dialogReady"
      class="md-dialog"
      :class="[rootClasses]"
      @click="handleInteraction"
      @keydown="handleInteraction"
    >
      <div class="md-dialog__scrim"></div>
      <div class="md-dialog__container">
        <div class="md-dialog__surface">
          <header v-if="header && title" class="md-dialog__header">
            <slot name="header">
              <div class="md-dialog__header-title">
                {{ title }}
              </div>
              <div class="md-flex--grow-1" />
            </slot>
          </header>
          <div v-if="body" class="md-dialog__content">
            <slot name="default" />
          </div>
          <footer v-if="footer" class="md-dialog__footer">
            <slot name="footer">
              <button class="md-button" data-md-dialog-action="close">
                Cancel
              </button>
              <button class="md-button" data-md-dialog-action="accept">
                OK
              </button>
            </slot>
          </footer>
          <slot name="surface" />
        </div>
      </div>
    </aside>
  </transition>
</template>

<script>
import { default as createFocusTrap } from 'focus-trap'
import { cssClasses, strings } from './constants'
import { closest, matches } from '../../dom/ponyfill'

export default {
  name: 'MdDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    enableScrim: {
      type: Boolean,
      default: true
    },
    closeOnButtonClick: {
      type: Boolean,
      default: true
    },
    closeOnScrimClick: {
      type: Boolean,
      default: true
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    header: {
      type: Boolean,
      default: true
    },
    body: {
      type: Boolean,
      default: true
    },
    footer: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: null
    },
    scrimClickAction: {
      type: String,
      default: strings.CLOSE_ACTION
    },
    escapeKeyAction: {
      type: String,
      default: strings.CLOSE_ACTION
    }
  },
  data: function() {
    return {
      shown: false,
      previousFocus: null,
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
      currentYUp: 0,
      focusTrap: null,
      action: null,
      dialogReady: false
    }
  },
  computed: {
    rootClasses() {
      return [
        {
          'md-dialog--open': this.shown,
          'md-dialog--animating': this.animating
        }
      ]
    }
  },
  beforeDestroy() {
    this.removeBodyClass('md-dialog-scroll-lock')
    this.removeBodyClass('body-dialog-opening')
    this.removeBodyClass('body-dialog-closing')
    document.removeEventListener('keydown', this.handleDocumentKeydown_)
  },
  mounted() {
    this.$nextTick(() => {
      this.dialogReady = true
      document.addEventListener(
        'keydown',
        this.handleDocumentKeydown_.bind(this)
      )
    })
  },
  methods: {
    open() {
      this.$emit('update:show', true)
    },
    close(action) {
      this.action = action
      this.$emit('update:show', false)
    },
    saveFocus() {
      this.previousFocus = document.activeElement | null
    },
    focusSurface() {
      this.$el.focus()
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
    onTransitionEnd_() {
      this.animating = false
      if (!this.shown) return
      this.$el
        .querySelector(strings.CONTAINER_SELECTOR)
        .removeEventListener('transitionend', this.onTransitionEnd_)
    },
    /* transition state */
    enter(el, done) {
      this.saveFocus()
      this.notifyOpening()
      el.querySelector(strings.CONTAINER_SELECTOR).addEventListener(
        'transitionend',
        () => {
          document.querySelector('body').classList.add(cssClasses.SCROLL_LOCK)
          done()
        }
      )
    },
    afterEnter() {
      this.shown = true
      document.querySelector('body').classList.remove('body-dialog-opening')
      this.notifyOpened(this.action)
      this.$nextTick(() => {
        this.setFocusTrap()
        this.trapFocus()
        // TODO this.focusActiveNavigationItem()
      })
    },
    beforeLeave(el) {
      // ...
      document.querySelector('body').classList.add('body-dialog-closing')
    },
    leave(el, done) {
      this.notifyClosing(this.action)
      el.querySelector(strings.SCRIM_SELECTOR).addEventListener(
        'transitionend',
        () => {
          document
            .querySelector('body')
            .classList.remove('md-dialog-scroll-lock')
          done()
        }
      )
    },
    afterLeave() {
      document.querySelector('body').classList.remove('body-dialog-closing')
      this.releaseFocus()
      this.restoreFocus()
      this.notifyClosed(this.action)
      this.shown = false
    },
    trapFocus() {
      this.focusTrap && this.focusTrap.activate()
    },
    releaseFocus() {
      this.focusTrap && this.focusTrap.deactivate()
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
    notifyAction(action) {
      this.$emit(strings.ACTION_EVENT, action ? { action } : {})
    },
    notifyOpening(action) {
      this.$emit(strings.OPENING_EVENT, action ? { action } : {})
    },
    notifyOpened(action) {
      this.$emit(strings.OPENED_EVENT, action ? { action } : {})
    },
    notifyClosing(action) {
      this.$emit(strings.CLOSING_EVENT, action ? { action } : {})
    },
    notifyClosed(action) {
      this.$emit(strings.CLOSED_EVENT, action ? { action } : {})
    },
    getActionFromEvent(e) {
      if (!e.target) {
        return ''
      }
      const element = closest(e.target, `[${strings.ACTION_ATTRIBUTE}]`)
      return element && element.getAttribute(strings.ACTION_ATTRIBUTE)
    },
    eventTargetMatches(target, selector) {
      return target ? matches(target, selector) : false
    },
    handleInteraction(e) {
      const isClick = e.type === 'click'
      const isEnter = e.key === 'Enter' || e.keyCode === 13
      const isSpace = e.key === 'Space' || e.keyCode === 32
      const isScrim = this.eventTargetMatches(e.target, strings.SCRIM_SELECTOR)
      // eslint-disable-next-line no-unreachable
      if (isClick && isScrim && this.scrimClickAction !== '') {
        this.close()
      } else if (isClick || isSpace || isEnter) {
        const action = this.getActionFromEvent(e)
        if (action) {
          if (this.closeOnButtonClick) {
            this.close(action)
          } else {
            this.notifyAction(action)
          }
        }
      }
    },
    handleDocumentKeydown_(e) {
      const isEscape = e.key === 'Escape' || e.keyCode === 27
      if (isEscape && this.escapeKeyAction !== '') {
        this.close(this.escapeKeyAction)
      }
    },
    removeBodyClass(className) {
      document.body.classList.remove(className)
    }
  }
}
</script>
