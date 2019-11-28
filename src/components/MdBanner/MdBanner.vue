<template>
  <MdCollapse
    :uid="'zippy-' + uid"
    :open="open"
    @open="$emit('open')"
    @close="$emit('close')"
  >
    <div
      :id="uid"
      class="md-banner"
      :class="[
        sizeClass,
        {
          'md-banner--vertical': vertical,
          'md-banner--full-width': fullWidth
        }
      ]"
    >
      <div class="md-layout">
        <div
          v-if="icon"
          class="md-card__avatar md-banner__icon md-flex-noshrink"
        >
          <i class="material-icons">{{ icon }}</i>
        </div>
        <div class="md-banner__body md-typography--body-2 md-flex--grow">
          <slot name="body">
            {{ text }}
          </slot>
        </div>
      </div>
      <section class="md-banner__actions">
        <slot name="action">
          <MdButton
            v-if="dismissive"
            size="dense"
            :label="dismissiveText"
            @click="$emit('dismissive')"
          />
          <MdButton
            v-if="affirmative"
            size="dense"
            :label="affirmativeText"
            @click="$emit('affirmative')"
          />
        </slot>
      </section>
    </div>
  </MdCollapse>
</template>

<script>
import MdButton from '../MdButton/MdButton'
import MdCollapse from '../MdCollapse/MdCollapse'

export default {
  name: 'MdBanner',
  components: { MdButton, MdCollapse },
  props: {
    theme: {
      type: String,
      default: 'primary'
    },
    overlap: {
      type: Boolean,
      default: false
    },
    dismissive: {
      type: Boolean,
      default: false
    },
    affirmative: {
      type: Boolean,
      default: true
    },
    uid: {
      type: String,
      required: true
    },
    affirmativeText: {
      type: String,
      default: 'OK'
    },
    icon: {
      type: String,
      default: null
    },
    text: {
      type: String,
      required: true
    },
    dismissiveText: {
      type: String,
      default: 'Cancel'
    },
    size: {
      type: String,
      default: null
    },
    vertical: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    open: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    localOpen: false,
    animating: false,
    height: 0
  }),
  computed: {
    sizeClass() {
      return this.size ? `md-banner--${this.size}` : ''
    }
  },
  watch: {
    open(value) {
      this.localOpen = value
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.localOpen = this.open
    })
  }
}
</script>
