<template>
  <b-input-group
    v-if="allowedToRebuild()"
    style="width: auto;"
  >
    <b-input-group-text
      slot="prepend"
      class="border border-warning text-warning bg-white"
      @click.stop=""
    >
      <font-awesome-icon icon="redo" />
    </b-input-group-text>
    <b-button
      variant="outline-warning"
      size="sm"
      @click.stop="rebuild"
    >
      Rebuild
    </b-button>
  </b-input-group>
</template>

<script>
import { mapState } from 'vuex'
import { BInputGroup, BButton, BInputGroupText } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faRedo)

export default {
  components: {
    BInputGroup,
    BButton,
    BInputGroupText,
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
            // eslint-disable-next-line vue/no-mutating-props
            this.builds.unshift(response.data)
            // eslint-disable-next-line vue/no-mutating-props
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
