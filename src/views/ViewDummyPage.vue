<template>
  <div>
    <p>This is a dummy page; please create a component and reference it from the router</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  methods: {
    isFunction (functionToCheck) {
      return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
    }
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    }),

    page () {
      return this.$route
    },

    header () {
      var page = this.page
      if (!page) {
        return ''
      }

      if (page.meta && page.meta.text) {
        return page.meta.text
      }

      return page.name
    }
  }
}
</script>
