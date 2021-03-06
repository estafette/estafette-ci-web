<template>
  <div v-if="user && user.active && pipelines.length > 0">
    <div
      class="row m-0 mt-3 mb-3 ml-3 justify-content-center"
    >
      <div class="h5 text-center mt-3 mb-3 text-secondary">
        {{ title }}
      </div>
    </div>

    <transition-group
      name="list-complete"
      tag="div"
    >
      <pipeline-compact
        v-for="pipeline in pipelines"
        :key="pipeline.repoSource+'/'+pipeline.repoOwner+'/'+pipeline.repoName"
        :pipeline="pipeline"
        :filter="filter"
        :type="type"
      />
    </transition-group>

    <div class="row m-0">
      <div class="col-12 text-right pr-0">
        <b-button
          v-if="filter == 'recent-committer'"
          variant="success"
          :to="{ name: 'Pipelines', query: { recentCommitter: 'true' } }"
        >
          See more
        </b-button>
        <b-button
          v-if="filter == 'recent-releaser'"
          variant="success"
          :to="{ name: 'Pipelines', query: { recentReleaser: 'true' } }"
        >
          See more
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PipelineCompact from '@/components/PipelineCompact'
import { BButton } from 'bootstrap-vue'

export default {
  components: {
    PipelineCompact,
    BButton
  },

  props: {
    filter: {
      type: String,
      default: 'recent-committer'
    },
    title: {
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
        size: 4,
        totalPages: 0,
        totalItems: 0
      },
      refresh: true
    }
  },

  created () {
    this.loadPipelines()
  },

  methods: {
    loadPipelines () {
      if (!this.user || !this.user.active) {
        this.periodicallyRefreshPipelines(30)
        return
      }
      this.axios.get(`/api/pipelines?filter[since]=1w&filter[since]=1w&filter[${this.filter}]=${this.user.email}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}&sort=-last_updated_at,repo_source,repo_owner,repo_name`)
        .then(response => {
          this.pipelines = response.data.items
          this.pagination = response.data.pagination

          this.periodicallyRefreshPipelines(5)
        })
        .catch(e => {
          this.periodicallyRefreshPipelines(30)
        })
    },

    periodicallyRefreshPipelines (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadPipelines, timeoutWithJitter)
      }
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

  computed: {
    ...mapState('user', {
      user: 'me'
    }),

    firstPageItem: function () {
      return 1 + (this.pagination.page - 1) * this.pagination.size
    },
    lastPageItem: function () {
      return this.pagination.page * this.pagination.size < this.pagination.totalItems ? this.pagination.page * this.pagination.size : this.pagination.totalItems
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
