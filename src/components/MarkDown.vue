<template>
  <div v-html="markedContent" />
</template>

<script>
import marked from 'marked'

export default {
  data: function () {
    return {
      markedContent: this.$slots.default ? marked(this.$slots.default[0].text) : ''
    }
  }
}
</script>
