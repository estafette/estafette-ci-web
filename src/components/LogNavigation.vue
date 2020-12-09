<template>
  <b-button-group
    class="mb-3 bg-white"
  >
    <b-button
      :to="{ params: { logid: null } }"
      active-class="router-link-active"
      variant="outline-primary"
      :class="[ !logid ? 'active' : 'border-btn-group' ]"
    >
      <span
        v-if="status === 'pending' || status === 'running' || status === 'canceling'"
      >
        Tailing...
      </span>
      <span
        v-else
      >
        Last
      </span>
    </b-button>
    <b-button
      v-for="(l, index) in logs"
      :key="l.id"
      :to="{ params: { logid: l.id } }"
      active-class="router-link-active"
      variant="outline-primary"
      :class="[ l.id === logid ? 'active' : 'border-btn-group' ]"
      :title="l.insertedAt"
    >
      {{ index + 1 }} / {{ logs.length }}
    </b-button>
  </b-button-group>
</template>

<script>
import { BButtonGroup, BButton } from 'bootstrap-vue'
import queryGenerator from '@/mixins/queryGenerator'

export default {
  components: {
    BButtonGroup,
    BButton
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
          this.periodicallyRefresh(15)
        })
        .catch(e => {
          this.periodicallyRefresh(30)
        })
    },

    periodicallyRefresh (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadAllLogs, timeoutWithJitter)
      }
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
