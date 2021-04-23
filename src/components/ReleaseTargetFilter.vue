<template>
  <b-input-group class="mb-3">
    <b-input-group-prepend
      is-text
      v-b-tooltip.hover
      title="Filter pipelines based on when they're last built or released"
    >
      <font-awesome-icon icon="upload" />
    </b-input-group-prepend>
    <b-form-select
      v-model="mutableModel"
      :options="releaseTargetOptions"
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
    this.loadReleaseTargets()
  },

  methods: {
    loadReleaseTargets () {
      let labelFilterParams = ''
      if (this.filter && this.filter.labels && this.filter.labels.length > 0) {
        labelFilterParams = this.filter.labels.split(',').join('&filter[labels]=')
      }

      let statusFilter = `filter[status]=${this.filter.status}`
      if (this.filter.status === 'running') {
        statusFilter += '&filter[status]=pending&filter[status]=canceling'
      }

      this.axios.get(`/api/releasetargets/${this.mode}?${statusFilter}&filter[since]=${this.filter.since}&filter[search]=${this.filter.search}&filter[labels]=${labelFilterParams}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}`)
        .then(response => {
          this.targets = response.data.items
          this.periodicallyRefreshReleaseTargets(5)
        })
        .catch(e => {
          this.periodicallyRefreshReleaseTargets(30)
        })
    },

    periodicallyRefreshReleaseTargets (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadReleaseTargets, timeoutWithJitter)
      }
    }
  },

  watch: {
    filter: {
      handler: function (to, from) {
        this.loadReleaseTargets()
      },
      deep: true
    }
  },

  computed: {
    releaseTargetOptions () {
      const releaseTargetOptions = [
        { value: '', text: 'All release targets' }
      ]

      if (this.targets) {
        this.targets.forEach(t => {
          releaseTargetOptions.push({ value: t.name, text: `${t.name} (${t.count})` })
        })
      }

      return releaseTargetOptions
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
