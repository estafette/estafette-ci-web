<template>
  <b-input-group
    v-if="user.authenticated && ((build && (build.buildStatus === 'pending' || build.buildStatus === 'running' || build.buildStatus === 'canceling')) || (release && (release.releaseStatus === 'pending' || release.releaseStatus === 'running' || release.releaseStatus === 'canceling')))"
    style="width: auto;"
  >
    <b-input-group-text
      slot="prepend"
      class="border border-danger text-danger bg-white"
      @click.stop=""
    >
      <font-awesome-icon icon="ban" />
    </b-input-group-text>
    <div
      class="btn btn-outline-danger btn-sm"
      @click.stop="cancel"
    >
      Cancel
    </div>
  </b-input-group>
</template>

<script>
import bInputGroup from 'bootstrap-vue/es/components/input-group/input-group'
import bInputGroupText from 'bootstrap-vue/es/components/input-group/input-group-text'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBan)

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
    release: {
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
    cancel: function (event) {
      if (this.user.authenticated) {
        if (this.build && (this.build.buildStatus === 'pending' || this.build.buildStatus === 'running' || this.build.buildStatus === 'canceling')) {
          this.axios.delete(`/api/pipelines/${this.build.repoSource}/${this.build.repoOwner}/${this.build.repoName}/builds/${this.build.id}`)
            .then(response => {
              this.build.buildStatus = 'canceling'
              console.log(response)
            })
            .catch(error => {
              console.log(error)
            })
        } else if (this.release && (this.release.releaseStatus === 'pending' || this.release.releaseStatus === 'running' || this.release.releaseStatus === 'canceling')) {
          this.axios.delete(`/api/pipelines/${this.release.repoSource}/${this.release.repoOwner}/${this.release.repoName}/releases/${this.release.id}`)
            .then(response => {
              this.release.releaseStatus = 'canceling'
              console.log(response)
            })
            .catch(error => {
              console.log(error)
            })
        }
      }
    }
  }
}
</script>
