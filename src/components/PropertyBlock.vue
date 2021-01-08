<template>
  <div :class="cssClass">
    <property-label
      :text="label"
      :class="labelCssClass"
    />
    <property-value
      :class="valueCssClass"
      :title="value"
    >
      <slot>{{ value }}</slot>
    </property-value>
  </div>
</template>

<script>
import PropertyLabel from '@/components/PropertyLabel'
import PropertyValue from '@/components/PropertyValue'

export default {
  components: {
    PropertyLabel,
    PropertyValue
  },

  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    titleValue: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'].indexOf(value) !== -1
      }
    },
    labelCssClass: {
      type: String,
      default: ''
    },
    valueCssClass: {
      type: String,
      default: ''
    },
    title: {
      type: Boolean,
      default: false
    },
    wide: {
      type: Boolean,
      default: false
    },
    noTruncate: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    cssClass () {
      if (this.title) {
        return `property-block-title variant-${this.variant}`
      }
      if (this.wide) {
        return 'property-block-wide'
      }
      if (this.noTruncate) {
        return 'property-block-no-truncate'
      }

      return 'property-block'
    }
  }
}
</script>
