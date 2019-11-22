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
    <div
      class="btn btn-outline-warning btn-sm"
      @click.stop="rebuild"
    >
      Rebuild
    </div>
  </b-input-group>
</template>

<script>
import { BInputGroup, BInputGroupText } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faRedo)

export default {
  components: {
    BInputGroup,
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
    },
    user: {
      type: Object,
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
      if (!this.user.authenticated || !this.build || (this.build.buildStatus !== 'failed' && this.build.buildStatus !== 'canceled')) {
        return false
      }

      if (this.builds && this.builds.length > 0) {
        return !this.builds.some(b => b.buildVersion === this.build.buildVersion && b.buildStatus === 'succeeded')
      }

      return true
    },

    rebuild: function (event) {
      if (this.user.authenticated) {
        this.axios.post(`/api/pipelines/${this.build.repoSource}/${this.build.repoOwner}/${this.build.repoName}/builds`, this.build)
          .then(response => {
            console.log(response)
            // add new build at the top
            this.builds.unshift(response.data)
            this.builds.shift()
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
}
</script>
