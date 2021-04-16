<template>
  <b-jumbotron
    v-if="section"
    :header="header"
    :bg-variant="bgVariant"
    :text-variant="textVariant"
    header-level="4"
    container-fluid
    fluid
    class="section-header"
  />
</template>

<script>
import { mapState } from 'vuex'
import { BJumbotron } from 'bootstrap-vue'

export default {
  components: {
    BJumbotron
  },

  props: {
    sectionRouteName: {
      type: String,
      default: null
    }
  },

  methods: {
    isFunction (functionToCheck) {
      return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
    }
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    }),

    section () {
      // get name of active outer route
      let activeSectionRouteName = this.$route.matched[0].name

      // if prop is set use that instead
      if (this.sectionRouteName) {
        activeSectionRouteName = this.sectionRouteName
      }

      // get active outer route
      return this.$router.options.routes.find(r => r.name === activeSectionRouteName)
    },

    header () {
      const section = this.section
      if (!section) {
        return ''
      }

      if (section.meta && section.meta.text) {
        return section.meta.text
      }

      return section.name
    },

    bgVariant () {
      const section = this.section
      if (!section) {
        return 'secondary'
      }

      if (section.meta && section.meta.variant) {
        return section.meta.variant
      }

      return 'secondary'
    },

    textVariant () {
      const section = this.section
      if (!section) {
        return 'white'
      }

      if (section.meta && section.meta.variant) {
        switch (section.meta.variant) {
          case 'warning':
            return 'dark'
        }
      }

      return 'white'
    }
  }
}
</script>
