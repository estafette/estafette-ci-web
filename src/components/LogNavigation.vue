<template>
  <b-button-group
    v-if="logCount > 0"
    class="mb-3 bg-white"
  >
    <b-button
      v-for="(l, index) in logs"
      :key="l.id"
      :to="{ params: { logid: l.id } }"
      active-class="router-link-active"
      variant="outline-primary"
      :class="[ l.id === logid ? 'active' : 'border-btn-group' ]"
      :title="l.insertedAt"
    >
      {{ index + 1 }} / {{ logCount }}
    </b-button>
    <b-button
      v-if="status === 'pending' || status === 'running' || status === 'canceling'"
      :to="{ params: { logid: null } }"
      active-class="router-link-active"
      variant="outline-primary"
      :class="[ !logid ? 'active' : 'border-btn-group' ]"
    >
      {{ logCount }} / {{ logCount }} <font-awesome-icon icon="stream" />
    </b-button>
  </b-button-group>
</template>

<script>
import { BButtonGroup, BButton } from 'bootstrap-vue'
import queryGenerator from '@/mixins/queryGenerator'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faStream } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faStream)

export default {
  components: {
    BButtonGroup,
    BButton,
    FontAwesomeIcon
  },

  mixins: [queryGenerator],

  props: {
    logUrl: {
      type: String,
      default: null
    },
    routeName: {
      type: String,
      default: null
    },
    status: {
      type: String,
      default: null
    },
    logid: {
      type: String,
      default: null
    }
  },

  data: function () {
    return {
      logs: [],
      refresh: true
    }
  },

  created () {
    this.loadAllLogs()
  },

  methods: {
    loadAllLogs () {
      this.axios.get(this.logUrl)
        .then(response => {
          this.logs = response.data.items
          this.redirectIfNeeded()
          this.periodicallyRefresh(15)
        })
        .catch(e => {
          this.periodicallyRefresh(30)
        })
    },

    redirectIfNeeded () {
      if (this.logid) {
        return
      }

      if (this.status === 'pending' || this.status === 'running' || this.status === 'canceling') {
        return
      }

      if (this.logs.length === 0) {
        return
      }

      this.$router.replace({ params: { logid: this.logs[this.logs.length - 1].id } })
    },

    periodicallyRefresh (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadAllLogs, timeoutWithJitter)
      }
    }
  },

  computed: {
    logCount () {
      if (this.status === 'pending' || this.status === 'running' || this.status === 'canceling') {
        return this.logs.length + 1
      }

      return this.logs.length
    }
  },

  beforeDestroy () {
    this.refresh = false
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }
}
</script>
