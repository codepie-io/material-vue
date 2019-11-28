<template>
  <div
    role="progressbar"
    :aria-valuemax="mode !== 'indeterminate' ? 100 : false"
    :aria-valuemin="mode !== 'indeterminate' ? 0 : false"
    :aria-valuenow="mode !== 'indeterminate' ? progress : false"
    :class="[progressMode, rootClasses]"
    class="md-linear-progress"
  >
    <div class="md-linear-progress__aux"></div>
    <div class="md-linear-progress__buffer" :style="bufferStyle"></div>
    <div
      class="md-linear-progress__bar md-linear-progress__primary-bar"
      :style="progressStyle"
    >
      <div class="md-linear-progress__bar-inner"></div>
    </div>
    <div class="md-linear-progress__bar md-linear-progress__secondary-bar">
      <div class="md-linear-progress__bar-inner"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MdLinearProgress',
  props: {
    mode: {
      type: String,
      default: 'indeterminate',
      validator: value => {
        return ['indeterminate', 'determinate', 'buffer'].indexOf(value) >= 0
      }
    },
    theme: {
      type: String,
      default: 'primary'
    },
    reverse: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: true
    },
    autoFinish: {
      type: Boolean,
      default: true
    },
    progress: {
      type: Number,
      default: 0
    },
    buffer: {
      type: Number,
      default: 0
    }
  },
  computed: {
    rootClasses() {
      return [
        {
          'md-linear-progress--closed': !this.show,
          'md-linear-progress--reversed': this.reverse
        }
      ]
    },
    progressMode() {
      return `md-linear-progress--${this.mode}`
    },
    bufferStyle() {
      return {
        transform:
          this.mode === 'buffer' && !isNaN(this.buffer)
            ? `scaleX(${Math.floor(this.buffer) / 100})`
            : false
      }
    },
    progressStyle() {
      return {
        transform:
          this.mode !== 'indeterminate' && !isNaN(this.progress)
            ? `scaleX(${Math.floor(this.progress) / 100})`
            : false
      }
    }
  },
  methods: {
    open() {
      this.$emit('update:show', true)
    },
    close() {
      this.$emit('update:show', false)
    },
    setMode(mode) {
      this.$emit('update:mode', mode)
    },
    setBuffer(num) {
      this.$emit('update:buffer', num)
    },
    setProgress(num) {
      this.$emit('update:progress', num)
    },
    setReverse(state) {
      this.$emit('update:reverse', state)
    },
    reset() {
      this.$emit('update:progress', 0)
      this.$emit('update:buffer', 0)
    }
  }
}
</script>
