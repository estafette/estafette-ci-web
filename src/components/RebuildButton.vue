<template>
  <b-input-group v-if="user.authenticated && build && (build.buildStatus === 'failed' || build.buildStatus === 'canceled')">
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
import bInputGroup from 'bootstrap-vue/es/components/input-group/input-group'
import bInputGroupText from 'bootstrap-vue/es/components/input-group/input-group-text'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faRedo)

export default {
  components: {
    bInputGroup,
    bInputGroupText,
    FontAwesomeIcon
  },
  props: {
    build: {
      type: Object,
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
    rebuild: function (event) {
      if (this.user.authenticated) {
        this.axios.post(`/api/pipelines/${this.build.repoSource}/${this.build.repoOwner}/${this.build.repoName}/builds`, this.build)
          .then(response => {
            this.build.buildStatus = 'running'
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
}
</script>
