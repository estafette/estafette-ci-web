<template>
  <div class="m-3">
    <div
      class="row mt-0 mr-0 ml-0"
    >
      <div class="col-12 col-sm-8 col-lg" />
      <div class="col-12 col-sm-4 col-lg-2 p-0 text-right">
        <b-input-group class="mb-3">
          <b-input-group-prepend
            is-text
          >
            <font-awesome-icon icon="history" />
          </b-input-group-prepend>
          <b-form-select
            v-model="filter.last"
            :options="lastOptions"
            @change="setLast"
          />
        </b-input-group>
      </div>
    </div>

    <div class="mt-0 mr-3 mb-3 ml-3 row">
      <div class="col-12 col-xl-6 col-xxxl-4">
        <pipeline-stats-timeline
          :pipeline="pipeline"
          :filter="filter"
          type="builds"
          status="primary"
          class="mb-3"
        />
      </div>
      <div
        v-if="hasReleases"
        class="col-12 col-xl-6 col-xxxl-4"
      >
        <pipeline-stats-timeline
          :pipeline="pipeline"
          :filter="filter"
          type="releases"
          status="success"
          class="mb-3"
        />
      </div>
      <div
        v-if="hasBots"
        class="col-12 col-xl-6 col-xxxl-4"
      >
        <pipeline-stats-timeline
          :pipeline="pipeline"
          :filter="filter"
          type="bots"
          status="warning"
          class="mb-3"
        />
      </div>

      <div class="col-12 col-xl-6 col-xxxl-4">
        <pipeline-stats-cpu
          :pipeline="pipeline"
          :filter="filter"
          type="builds"
          status="primary"
          class="mb-3"
        />
      </div>
      <div
        v-if="hasReleases"
        class="col-12 col-xl-6 col-xxxl-4"
      >
        <pipeline-stats-cpu
          :pipeline="pipeline"
          :filter="filter"
          type="releases"
          status="success"
          class="mb-3"
        />
      </div>
      <div
        v-if="hasBots"
        class="col-12 col-xl-6 col-xxxl-4"
      >
        <pipeline-stats-cpu
          :pipeline="pipeline"
          :filter="filter"
          type="bots"
          status="warning"
          class="mb-3"
        />
      </div>

      <div class="col-12 col-xl-6 col-xxxl-4">
        <pipeline-stats-memory
          :pipeline="pipeline"
          :filter="filter"
          type="builds"
          status="primary"
          class="mb-3"
        />
      </div>
      <div
        v-if="hasReleases"
        class="col-12 col-xl-6 col-xxxl-4"
      >
        <pipeline-stats-memory
          :pipeline="pipeline"
          :filter="filter"
          type="releases"
          status="success"
          class="mb-3"
        />
      </div>
      <div
        v-if="hasBots"
        class="col-12 col-xl-6 col-xxxl-4"
      >
        <pipeline-stats-memory
          :pipeline="pipeline"
          :filter="filter"
          type="bots"
          status="warning"
          class="mb-3"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PipelineStatsTimeline from '@/components/PipelineStatsTimeline'
import PipelineStatsCpu from '@/components/PipelineStatsCpu'
import PipelineStatsMemory from '@/components/PipelineStatsMemory'
import { BFormSelect, BInputGroup, BInputGroupPrepend } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faChartLine, faHistory } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChartLine, faHistory)

export default {
  components: {
    PipelineStatsTimeline,
    PipelineStatsCpu,
    PipelineStatsMemory,
    BFormSelect,
    BInputGroup,
    BInputGroupPrepend,
    FontAwesomeIcon
  },

  props: {
    query: {
      type: Object,
      default: null
    },
    pipeline: {
      type: Object,
      default: null
    }
  },
  data: function () {
    return {
      filter: {
        last: '100'
      },
      lastOptions: [
        { value: '25', text: 'Last 25 builds/releases/bots' },
        { value: '100', text: 'Last 100 builds/releases/bots' },
        { value: '250', text: 'Last 250 builds/releases/bots' },
        { value: '1000', text: 'Last 1000 builds/releases/bots' },
        { value: '100000', text: 'All builds/releases/bots' }
      ]
    }
  },

  created () {
    this.setDataFromQueryParams(this.query)
  },

  methods: {
    setDataFromQueryParams (query) {
      this.filter.last = query && query.last ? query.last : '100'
    },

    updateQueryParams () {
      this.$router.push({ query: { last: this.filter.last } })
    },

    setLast (value) {
      this.filter.last = value
      this.updateQueryParams()
    }
  },

  computed: {
    hasReleases () {
      return this.pipeline && this.pipeline.releaseTargets && this.pipeline.releaseTargets.length > 0
    },
    hasBots () {
      return this.pipeline && this.pipeline.triggers && this.pipeline.triggers.some(t => t.runs)
    }
  }
}
</script>
