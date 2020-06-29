<template>
  <b-button
    v-if="user.active && ((build && (build.buildStatus === 'pending' || build.buildStatus === 'running' || build.buildStatus === 'canceling')) || (release && (release.releaseStatus === 'pending' || release.releaseStatus === 'running' || release.releaseStatus === 'canceling')))"
    variant="danger"
    size="sm"
    @click.stop="cancel"
    v-b-tooltip.hover
    title="Cancel this build"
  >
    <font-awesome-icon icon="ban" />
  </b-button>
</template>

<script>
import { BButton } from 'bootstrap-vue'

import { mapState } from 'vuex'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBan)

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
    release: {
      type: Object,
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
    cancel: function (event) {
      if (this.user.active) {
        if (this.build && (this.build.buildStatus === 'pending' || this.build.buildStatus === 'running' || this.build.buildStatus === 'canceling')) {
          this.axios.delete(`/api/pipelines/${this.build.repoSource}/${this.build.repoOwner}/${this.build.repoName}/builds/${this.build.id}`)
            .then(response => {
              this.build.buildStatus = 'canceling'
            })
            .catch(e => {
              console.warn(e)
            })
        } else if (this.release && (this.release.releaseStatus === 'pending' || this.release.releaseStatus === 'running' || this.release.releaseStatus === 'canceling')) {
          this.axios.delete(`/api/pipelines/${this.release.repoSource}/${this.release.repoOwner}/${this.release.repoName}/releases/${this.release.id}`)
            .then(response => {
              this.release.releaseStatus = 'canceling'
            })
            .catch(e => {
              console.warn(e)
            })
        }
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
