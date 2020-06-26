<template>
  <div
    v-if="section"
    class="col-12 col-md-6 col-xxxl-3"
  >
    <!-- <b-jumbotron
      :header="header"
      :lead="lead"
      :bg-variant="bgVariant"
      :text-variant="textVariant"
      header-level="4"
      container-fluid
      fluid
      class="mb-3 p-3 rounded border"
    >
      <b-button
        variant="light"
        :to="{ name: section.name }"
      >
        See more
      </b-button>
    </b-jumbotron> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { BJumbotron, BButton } from 'bootstrap-vue'

export default {
  components: {
    // BJumbotron,
    // BButton
  },

  props: {
    section: {
      type: Object,
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

    header () {
      var section = this.section
      if (!section) {
        return ''
      }

      if (section.meta && section.meta.text) {
        return section.meta.text
      }

      return section.name
    },

    lead () {
      var section = this.section
      if (!section) {
        return ''
      }

      if (section.meta && section.meta.lead) {
        return section.meta.lead
      }

      return ''
    },

    bgVariant () {
      var section = this.section
      if (!section) {
        return 'secondary'
      }

      if (section.meta && section.meta.variant) {
        return section.meta.variant
      }

      return 'secondary'
    },

    textVariant () {
      var section = this.section
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
