<template>
  <b-input-group
    v-if="allowedToRerun()"
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
      @click.stop="rerun"
    >
      Rerun
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
    allowedToRerun: function () {
      if (!this.user.active || !this.bot || (this.bot.botStatus !== 'failed' && this.bot.botStatus !== 'canceled')) {
        return false
      }

      return true
    },

    rerun: function (event) {
      if (this.user.active) {
        this.axios.post(`/api/pipelines/${this.bot.repoSource}/${this.bot.repoOwner}/${this.bot.repoName}/bots`, this.bot)
          .then(response => {
            // do nothing, next reload will show the bot
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
