<template>
  <div class="property-value">
    <slot>{{ text }}</slot>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
