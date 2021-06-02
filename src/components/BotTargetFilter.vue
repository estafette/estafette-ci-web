<template>
  <b-input-group class="mb-3">
    <b-input-group-prepend
      is-text
      v-b-tooltip.hover
      title="Filter pipelines based on when they're last built or executed"
    >
      <font-awesome-icon icon="upload" />
    </b-input-group-prepend>
    <b-form-select
      v-model="mutableModel"
      :options="botTargetOptions"
      @change="onChange"
    />
  </b-input-group>
</template>

<script>
import { BFormSelect, BInputGroup, BInputGroupPrepend } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUpload)

export default {
  components: {
    BFormSelect,
    BInputGroup,
    BInputGroupPrepend,
    FontAwesomeIcon
  },

  props: {
    mode: {
      type: String,
      default: 'pipelines'
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
      targets: [],
      pagination: {
        page: 1,
        size: 15
      },
      refresh: true,
      mutableModel: this.model
    }
  },

  created () {
    this.loadBotTargets()
  },

  methods: {
    loadBotTargets () {
      let labelFilterParams = ''
      if (this.filter && this.filter.labels && this.filter.labels.length > 0) {
        labelFilterParams = this.filter.labels.split(',').join('&filter[labels]=')
      }

      let statusFilter = `filter[status]=${this.filter.status}`
      if (this.filter.status === 'running') {
        statusFilter += '&filter[status]=pending&filter[status]=canceling'
      }

      this.axios.get(`/api/bottargets/${this.mode}?${statusFilter}&filter[since]=${this.filter.since}&filter[search]=${this.filter.search}&filter[labels]=${labelFilterParams}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}`)
        .then(response => {
          this.targets = response.data.items
          this.periodicallyRefreshBotTargets(5)
        })
        .catch(e => {
          this.periodicallyRefreshBotTargets(30)
        })
    },

    periodicallyRefreshBotTargets (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadBotTargets, timeoutWithJitter)
      }
    }
  },

  watch: {
    filter: {
      handler: function (to, from) {
        this.loadBotTargets()
      },
      deep: true
    }
  },

  computed: {
    botTargetOptions () {
      const botTargetOptions = [
        { value: '', text: 'All bots' }
      ]

      if (this.targets) {
        this.targets.forEach(t => {
          botTargetOptions.push({ value: t.name, text: `${t.name} (${t.count})` })
        })
      }

      return botTargetOptions
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
