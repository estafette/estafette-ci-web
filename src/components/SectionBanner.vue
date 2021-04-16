<template>
  <div
    v-if="section"
    class="col-12 col-md-6 col-xxxl-3"
  >
    <router-link
      :to="{ name: section.name }"
      tag="div"
    >
      <b-jumbotron
        :header="header"
        :lead="lead"
        :bg-variant="bgVariant"
        :text-variant="textVariant"
        header-level="4"
        container-fluid
        fluid
        class="section-banner clickable"
      >
        <!-- <b-button
          variant="light"
          :to="{ name: section.name }"
        >
          See more
        </b-button> -->
      </b-jumbotron>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BJumbotron } from 'bootstrap-vue'

export default {
  components: {
    BJumbotron// ,
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
      const section = this.section
      if (!section) {
        return ''
      }

      if (section.meta && section.meta.text) {
        return section.meta.text
      }

      return section.name
    },

    lead () {
      const section = this.section
      if (!section) {
        return ''
      }

      if (section.meta && section.meta.lead) {
        return section.meta.lead
      }

      return ''
    },

    bgVariant () {
      const section = this.section
      if (!section) {
        return 'secondary'
      }

      if (section.meta && section.meta.variant) {
        switch (section.meta.variant) {
          case 'light':
            return 'dark'
        }
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
