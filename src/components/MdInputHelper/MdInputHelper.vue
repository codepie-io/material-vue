<template>
  <div :class="rootClasses" class="md-input-helper">
    <div
      v-if="!invalid"
      :class="{ 'md-input-helper__text--persistent': persistent }"
      class="md-input-helper__text"
    >
      {{ helperText }}
    </div>
    <div
      v-else
      class="md-input-helper__text md-input-helper__text--validation-msg"
    >
      {{ errorText }}
    </div>
    <div
      v-if="showCounter"
      class="md-input-helper__text--counter md-input-helper__text"
    >
      {{ valueLength }} / {{ maxlength }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MdInputHelper',
  props: {
    invalid: {
      type: Boolean,
      default: false
    },
    valueLength: {
      type: Number,
      default: 0
    },
    maxlength: {
      type: Number,
      default: 0
    },
    showCounter: {
      type: Boolean,
      default: false
    },
    persistent: {
      type: Boolean,
      default: false
    },
    errorText: {
      type: String,
      default: ''
    },
    helperText: {
      type: String,
      default: ''
    }
  },
  computed: {
    rootClasses() {
      return [
        {
          'md-input-helper--invalid': this.invalid
        }
      ]
    }
  }
}
</script>
