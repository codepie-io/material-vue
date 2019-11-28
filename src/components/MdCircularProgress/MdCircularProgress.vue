<template>
  <div
    role="progressbar"
    :aria-valuemax="mode !== 'indeterminate' ? 100 : false"
    :aria-valuemin="mode !== 'indeterminate' ? 0 : false"
    :aria-valuenow="mode !== 'indeterminate' ? progress : false"
    :style="rootStyle"
    :class="[themeClass, progressMode, rootClasses]"
    class="md-circular-progress"
  >
    <svg
      class="md-circular-progress__bar"
      :width="size + 'px'"
      :height="size + 'px'"
      viewBox="22 22 44 44"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="md-circular-progress__path"
        :style="pathStyle"
        fill="none"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        cx="44"
        cy="44"
        r="20"
      ></circle>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'MdCircularProgress',
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
      default: null
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
    size: {
      type: Number,
      default: 48
    }
  },
  data: function() {
    return {
      strokeWidth: 4
    }
  },
  computed: {
    rootClasses() {
      return [
        {
          'md-circular-progress--closed': !this.show
        }
      ]
    },
    themeClass() {
      return this.theme ? `md-circular-progress--${this.theme}` : ''
    },
    progressMode() {
      return `md-circular-progress--${this.mode}`
    },
    rootStyle() {
      return {
        transform: this.mode === 'determinate' ? `rotate(-90deg)` : false,
        width: `${this.size}px`,
        height: `${this.size}px`
      }
    },
    strokeDashoffset() {
      if (this.mode === 'determinate') {
        return this.progress
          ? this.circumference - (this.progress / 100) * this.circumference
          : 0
      } else if (this.mode === 'indeterminate') {
        return this.circumference
      }
      return false
    },
    pathStyle() {
      return {
        strokeDasharray:
          this.mode === 'indeterminate' ? false : this.circumference,
        strokeDashoffset: this.strokeDashoffset
      }
    },
    radius() {
      return (44 - this.strokeWidth) / 2
    },
    circumference() {
      return 2 * Math.PI * this.radius
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
    setProgress(num) {
      this.$emit('update:progress', num)
    },
    reset() {
      this.$emit('update:progress', 0)
    }
  }
}
</script>
