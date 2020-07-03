<template>
  <b-card
    no-body
    tag="article"
    :header="header"
    header-bg-variant="success"
    header-text-variant="white"
    bg-variant="transparent"
    class="border-0"
    header-class="rounded"
  >
    <transition-group
      name="list-complete"
      tag="div"
      v-if="pipelines.length > 0"
    >
      <pipeline-row
        v-for="pipeline in pipelines"
        :key="pipeline.repoSource+'/'+pipeline.repoOwner+'/'+pipeline.repoName"
        :pipeline="pipeline"
        :filter="filter"
      />
    </transition-group>
    <b-pagination
      v-model="pagination.page"
      :total-rows="pagination.totalItems"
      :per-page="pagination.size"
      limit="3"
      hide-goto-end-buttons
      hide-ellipsis
      class="d-inline-flex"
      small
    />
  </b-card>
</template>

<script>
import { BCard, BPagination } from 'bootstrap-vue'
import PipelineRow from '@/components/PipelineRow'
import refresh from '../helpers/refresh'

export default {
  components: {
    BCard,
    BPagination,
    PipelineRow
  },

  props: {
    group: {
      type: Object,
      default: null
    },
    header: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },

  data: function () {
    return {
      pipelines: [],
      pagination: {
        page: 1,
        size: 12,
        totalPages: 0,
        totalItems: 0
      }
    }
  },

  created () {
    this.loadPipelines()
  },

  methods: {
    loadPipelines () {
      return this.axios.get(`/api/pipelines?filter[groups]=${this.group.name}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}&sort=-last_updated_at,repo_source,repo_owner,repo_name`)
        .then(response => {
          this.pipelines = response.data.items
          this.pagination = response.data.pagination

          refresh.timeoutWithJitter(this.timeout, this.loadPipelines, 15)
        })
        .catch(e => {
          console.warn(e)
          refresh.timeoutWithJitter(this.timeout, this.loadPipelines, 30)
        })
    }
  },

  watch: {
    user: {
      handler: function (to, from) {
        this.loadPipelines()
      },
      deep: true
    },
    pagination: {
      handler: function (to, from) {
        if (from.page !== to.page) {
          this.loadPipelines()
        }
      },
      deep: true
    }
  },

  beforeDestroy () {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }
}
</script>
