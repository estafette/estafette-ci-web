<template>
  <b-input-group
    v-if="user.active && ((build && (build.buildStatus === 'pending' || build.buildStatus === 'running' || build.buildStatus === 'canceling')) || (release && (release.releaseStatus === 'pending' || release.releaseStatus === 'running' || release.releaseStatus === 'canceling')) || (bot && (bot.botStatus === 'pending' || bot.botStatus === 'running' || bot.botStatus === 'canceling')))"
    style="width: auto;"
  >
    <b-input-group-text
      slot="prepend"
      class="border border-danger text-danger bg-white"
      @click.stop=""
    >
      <font-awesome-icon icon="ban" />
    </b-input-group-text>
    <b-button
      variant="outline-danger"
      size="sm"
      @click.stop="cancel"
    >
      Cancel
    </b-button>
  </b-input-group>
</template>

<script>
import { BInputGroup, BInputGroupText, BButton } from 'bootstrap-vue'

import { mapState } from 'vuex'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBan)

export default {
  components: {
    BInputGroup,
    BInputGroupText,
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
    bot: {
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
      if (this.user.active) {
        if (this.build && (this.build.buildStatus === 'pending' || this.build.buildStatus === 'running' || this.build.buildStatus === 'canceling')) {
          this.axios.delete(`/api/pipelines/${this.build.repoSource}/${this.build.repoOwner}/${this.build.repoName}/builds/${this.build.id}`)
            .then(response => {
              // eslint-disable-next-line vue/no-mutating-props
              this.build.buildStatus = 'canceling'
            })
            .catch(e => {
              console.warn(e)
            })
        } else if (this.release && (this.release.releaseStatus === 'pending' || this.release.releaseStatus === 'running' || this.release.releaseStatus === 'canceling')) {
          this.axios.delete(`/api/pipelines/${this.release.repoSource}/${this.release.repoOwner}/${this.release.repoName}/releases/${this.release.id}`)
            .then(response => {
              // eslint-disable-next-line vue/no-mutating-props
              this.release.releaseStatus = 'canceling'
            })
            .catch(e => {
              console.warn(e)
            })
        } else if (this.bot && (this.bot.botStatus === 'pending' || this.bot.botStatus === 'running' || this.bot.botStatus === 'canceling')) {
          this.axios.delete(`/api/pipelines/${this.bot.repoSource}/${this.bot.repoOwner}/${this.bot.repoName}/bots/${this.bot.id}`)
            .then(response => {
              // eslint-disable-next-line vue/no-mutating-props
              this.bot.botStatus = 'canceling'
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
