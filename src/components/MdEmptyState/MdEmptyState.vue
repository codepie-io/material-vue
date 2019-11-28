<template>
  <div
    :class="[horizontalClass]"
    class="md-empty-state"
    @click="handleInteraction"
  >
    <slot name="graphic">
      <div
        v-if="!imgSrc"
        :class="[circleClass]"
        class="md-empty-state__graphic"
      >
        <i class="material-icons no-user-select">{{ icon }}</i>
      </div>
      <img
        v-else
        :src="imgSrc"
        :class="[circleClass]"
        class="md-empty-state__graphic"
      />
    </slot>
    <div class="md-empty-state__content-wrapper">
      <slot name="heading">
        <div
          v-if="heading"
          class="md-empty-state__title md-typography-headline5"
        >
          {{ heading }}
        </div>
      </slot>
      <slot name="subheading">
        <div
          v-if="subHeading"
          class="md-empty-state__subtext md-typography-body2"
        >
          {{ subHeading }}
        </div>
      </slot>
      <slot name="action">
        <div class="md-empty-state__actions" v-if="showButton && buttonText">
          <button
            class="md-button md-empty-state__action--button"
            :class="buttonClass"
            data-md-empty-state-action="default"
          >
            <span class="md-button__label">{{ buttonText }}</span>
          </button>
        </div>
      </slot>
      <slot name="surface" />
    </div>
  </div>
</template>

<script>
import { cssClasses, strings } from './constants'
import { closest } from '../../dom/ponyfill'

export default {
  name: 'MdEmptyState',
  props: {
    heading: {
      type: String,
      default: null
    },
    subHeading: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    showButton: {
      type: Boolean,
      default: false
    },
    buttonText: {
      type: String,
      default: 'Try Again'
    },
    buttonClass: {
      type: String,
      default: 'md-button--raised md-button--primary'
    },
    imgSrc: {
      type: String,
      default: null
    },
    circle: {
      type: Boolean,
      default: false
    },
    horizontal: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    horizontalClass() {
      return this.horizontal ? cssClasses.HORIZONTAL : false
    },
    circleClass() {
      return this.circle ? cssClasses.GRAPHIC_CIRCLE : false
    }
  },
  methods: {
    notifyAction(action) {
      this.$emit(strings.ACTION_EVENT, action ? { action } : {})
    },
    getActionFromEvent(e) {
      if (!e.target) {
        return ''
      }
      const element = closest(e.target, `[${strings.ACTION_ATTRIBUTE}]`)
      return element && element.getAttribute(strings.ACTION_ATTRIBUTE)
    },
    handleInteraction(e) {
      const isClick = e.type === 'click'
      const isEnter = e.key === 'Enter' || e.keyCode === 13
      const isSpace = e.key === 'Space' || e.keyCode === 32
      if (isClick || isSpace || isEnter) {
        const action = this.getActionFromEvent(e)
        if (action) {
          this.notifyAction(action)
        }
      }
    }
  }
}
</script>
