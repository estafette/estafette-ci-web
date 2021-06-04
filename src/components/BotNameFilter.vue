<template>
  <b-input-group class="mb-3">
    <b-input-group-prepend
      is-text
      v-b-tooltip.hover
      title="Filter bots on their name"
    >
      <font-awesome-icon icon="robot" />
    </b-input-group-prepend>
    <b-form-select
      v-model="mutableModel"
      :options="botNameOptions"
      @change="onChange"
    />
  </b-input-group>
</template>

<script>
import { BFormSelect, BInputGroup, BInputGroupPrepend } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faRobot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faRobot)

export default {
  components: {
    BFormSelect,
    BInputGroup,
    BInputGroupPrepend,
    FontAwesomeIcon
  },

  props: {
    pipeline: {
      type: Object,
      default: null
    },
    filter: {
      type: Object,
      default: null
    },
    model: {
      type: String,
      default: null
    },
    onChange: {
      type: Function,
      default: null
    }
  },

  data: function () {
    return {
      bots: [],
      pagination: {
        page: 1,
        size: 15
      },
      refresh: true,
      mutableModel: this.model
    }
  },

  created () {
    this.loadBotNames()
  },

  methods: {
    loadBotNames () {
      let labelFilterParams = ''
      if (this.filter && this.filter.labels && this.filter.labels.length > 0) {
        labelFilterParams = this.filter.labels.split(',').join('&filter[labels]=')
      }

      let statusFilter = `filter[status]=${this.filter.status}`
      if (this.filter.status === 'running') {
        statusFilter += '&filter[status]=pending&filter[status]=canceling'
      }

      this.axios.get(`/api/pipelines/${this.pipeline.repoSource}/${this.pipeline.repoOwner}/${this.pipeline.repoName}/botnames?${statusFilter}&filter[since]=${this.filter.since}&filter[search]=${this.filter.search}&filter[labels]=${labelFilterParams}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}`)
        .then(response => {
          this.bots = response.data.items
          this.periodicallyRefreshBotNames(5)
        })
        .catch(e => {
          this.periodicallyRefreshBotNames(30)
        })
    },

    periodicallyRefreshBotNames (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadBotNames, timeoutWithJitter)
      }
    }
  },

  watch: {
    filter: {
      handler: function (to, from) {
        this.loadBotNames()
      },
      deep: true
    }
  },

  computed: {
    botNameOptions () {
      const botNameOptions = [
        { value: '', text: 'All bots' }
      ]

      if (this.bots) {
        this.bots.forEach(t => {
          botNameOptions.push({ value: t.name, text: `${t.name} (${t.count})` })
        })
      }

      return botNameOptions
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
