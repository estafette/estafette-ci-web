<template>
  <div
    class="lds-default"
    :class="color"
  >
    <div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div />
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: null
    }
  }
}
</script>
