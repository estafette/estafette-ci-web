<template>
  <div :class="cssClass">
    <property-label
      :text="label"
      :class="labelCssClass"
    />
    <property-value :class="valueCssClass">
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
        return 'property-block-title'
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
