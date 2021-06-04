<template>
  <b-input-group class="mb-3">
    <b-input-group-prepend
      is-text
      v-b-tooltip.hover
      title="Filter builds on their branch"
    >
      <font-awesome-icon icon="code-branch" />
    </b-input-group-prepend>
    <b-form-select
      v-model="mutableModel"
      :options="buildBranchOptions"
      @change="onChange"
    />
  </b-input-group>
</template>

<script>
import { BFormSelect, BInputGroup, BInputGroupPrepend } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCodeBranch)

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
      branches: [],
      pagination: {
        page: 1,
        size: 15
      },
      refresh: true,
      mutableModel: this.model
    }
  },

  created () {
    this.loadBuildBranches()
  },

  methods: {
    loadBuildBranches () {
      let labelFilterParams = ''
      if (this.filter && this.filter.labels && this.filter.labels.length > 0) {
        labelFilterParams = this.filter.labels.split(',').join('&filter[labels]=')
      }

      let statusFilter = `filter[status]=${this.filter.status}`
      if (this.filter.status === 'running') {
        statusFilter += '&filter[status]=pending&filter[status]=canceling'
      }

      this.axios.get(`/api/pipelines/${this.pipeline.repoSource}/${this.pipeline.repoOwner}/${this.pipeline.repoName}/buildbranches?${statusFilter}&filter[since]=${this.filter.since}&filter[search]=${this.filter.search}&filter[labels]=${labelFilterParams}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}`)
        .then(response => {
          this.branches = response.data.items
          this.periodicallyRefreshBuildBranches(5)
        })
        .catch(e => {
          this.periodicallyRefreshBuildBranches(30)
        })
    },

    periodicallyRefreshBuildBranches (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadBuildBranches, timeoutWithJitter)
      }
    }
  },

  watch: {
    filter: {
      handler: function (to, from) {
        this.loadBuildBranches()
      },
      deep: true
    }
  },

  computed: {
    buildBranchOptions () {
      const buildBranchOptions = [
        { value: '', text: 'All branches' }
      ]

      if (this.branches) {
        this.branches.forEach(t => {
          buildBranchOptions.push({ value: t.name, text: `${t.name} (${t.count})` })
        })
      }

      return buildBranchOptions
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
