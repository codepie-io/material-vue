<template>
  <div :class="rootClasses" class="md-notched">
    <div class="md-notched__leading"></div>
    <div :style="notchStyle" class="md-notched__notch">
      <label
        :for="uid"
        :class="[labelClasses, labelClass]"
        class="md-floating-label"
      >
        {{ label }}
      </label>
    </div>
    <div class="md-notched__trailing"></div>
  </div>
</template>

<script>
import config from '../../utils/config'

export default {
  name: 'MdNotchedOutline',
  props: {
    uid: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    labelClass: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      required: true
    },
    above: {
      type: Boolean,
      required: true
    },
    outlined: {
      type: Boolean,
      required: true
    },
    dense: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    valid: true,
    notchStyle: { width: '' },
    labelWidth_: ''
  }),
  watch: {
    above(value) {
      if (value) {
        this.openNotchStyle_()
      } else {
        this.closeNotchStyle_()
      }
    }
  },
  computed: {
    rootClasses() {
      return [
        {
          'md-notched--active': this.active,
          'md-notched--outlined': this.outlined
        }
      ]
    },
    labelClasses() {
      return [
        {
          'md-floating-label--float-above': this.above
        }
      ]
    }
  },
  methods: {
    openNotchStyle_() {
      const labelScale = this.dense ? config.denseLabelScale : config.labelScale
      const labelWidth = this.getLabelWidth_() * labelScale
      this.notchStyle = { width: `${labelWidth + 9}px` }
    },
    closeNotchStyle_() {
      this.notchStyle = { width: '' }
    },
    getLabelWidth_() {
      const el = this.$el.querySelector('.md-notched__notch')
      return el.offsetWidth
    }
  }
}
</script>
