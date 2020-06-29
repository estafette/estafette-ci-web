<template>
  <b-button
    v-if="allowedToRebuild()"
    variant="warning"
    size="sm"
    @click.stop="rebuild"
    v-b-tooltip.hover
    title="Rebuild this failed build"
  >
    <font-awesome-icon icon="redo" />
  </b-button>
</template>

<script>
import { mapState } from 'vuex'
import { BButton } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faRedo)

export default {
  components: {
    BButton,
    FontAwesomeIcon
  },
  props: {
    build: {
      type: Object,
      default: null
    },
    builds: {
      type: Array,
      default: null
    },
    compact: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      clicked: false
    }
  },
  methods: {
    allowedToRebuild: function () {
      if (!this.user.active || !this.build || (this.build.buildStatus !== 'failed' && this.build.buildStatus !== 'canceled')) {
        return false
      }

      if (this.builds && this.builds.length > 0) {
        return !this.builds.some(b => b.buildVersion === this.build.buildVersion && b.buildStatus === 'succeeded')
      }

      return true
    },

    rebuild: function (event) {
      if (this.user.active) {
        this.axios.post(`/api/pipelines/${this.build.repoSource}/${this.build.repoOwner}/${this.build.repoName}/builds`, this.build)
          .then(response => {
            // add new build at the top
            this.builds.unshift(response.data)
            this.builds.shift()
          })
          .catch(e => {
            console.warn(e)
          })
      }
    }
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    })
  }
}
</script>
