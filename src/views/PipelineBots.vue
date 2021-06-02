<template>
  <div class="m-3">
    <div class="row">
      <div class="col-12 col-lg-3">
        <!-- <bot-target-selector
          :model="filter.target"
          :on-change="setTarget"
          :pipeline="pipeline"
        /> -->
      </div>
      <div class="col-7 col-lg-6 text-lg-center">
        <status-filter :filter="filter" />
      </div>
      <div class="col-5 col-lg-3">
        <pagination-compact
          :pagination="pagination"
          :link-generator="paginationLinkGenerator"
          class="float-right"
        />
      </div>
    </div>

    <div class="row-header">
      <div class="col-2">
        Bot
      </div>
      <div class="col-2">
        Status
      </div>
      <div class="col-2">
        Executed
      </div>
      <div class="col-4">
        Triggered by
      </div>
      <div
        v-if="user && user.active"
        class="col-2"
      >
        Actions
      </div>
    </div>

    <transition-group
      name="list-complete"
      tag="div"
      v-if="bots.length > 0"
    >
      <bot-row
        v-for="bot in bots"
        :key="bot.id"
        :bot="bot"
        :pipeline="pipeline"
      />
    </transition-group>
    <div
      v-else-if="loaded"
      class="alert alert-warning text-center p-5"
    >
      There are no bots for the current filters. Please change your filters!
    </div>
    <div v-else>
      <spinner color="primary" />
    </div>

    <pagination
      :pagination="pagination"
      :link-generator="paginationLinkGenerator"
      v-if="bots.length > 0"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Spinner from '@/components/Spinner'
import Pagination from '@/components/Pagination'
import StatusFilter from '@/components/StatusFilter'
import BotRow from '@/components/BotRow'
import PaginationCompact from '@/components/PaginationCompact'
// import BotTargetSelector from '@/components/BotTargetSelector'

export default {
  components: {
    Spinner,
    Pagination,
    StatusFilter,
    BotRow,
    PaginationCompact //,
    // BotTargetSelector
  },
  props: {
    repoSource: {
      type: String,
      default: null
    },
    repoOwner: {
      type: String,
      default: null
    },
    repoName: {
      type: String,
      default: null
    },
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
      bots: [],
      pagination: {
        page: 1,
        size: 10,
        totalPages: 0,
        totalItems: 0
      },
      filter: {
        status: 'all',
        target: 'all'
      },
      loaded: false,
      refresh: true
    }
  },

  created () {
    this.filterDefaults = { ...this.filter }
    this.setDataFromQueryParams(this.query)
    this.$router.replace({ query: this.getQueryParams() }).catch(() => {})
    this.loadBots()
  },

  methods: {
    paginationLinkGenerator (pageNum) {
      const query = this.getQueryParams()

      if (pageNum > 0) {
        query.page = pageNum
      } else if (query.page) {
        delete query.page
      }

      return { query: query }
    },

    getQueryParams () {
      const query = { ...this.$route.query }

      if (this.filter && this.filter.status && this.filter.status !== '') {
        query.status = this.filter.status
      } else if (query.status) {
        delete query.status
      }

      if (this.filter && this.filter.target && this.filter.target !== '') {
        query.target = this.filter.target
      } else if (query.target) {
        delete query.target
      }

      if (this.pagination && this.pagination.page && this.pagination.page > 0) {
        query.page = this.pagination.page
      } else if (query.page) {
        delete query.page
      }

      return query
    },

    setDataFromQueryParams (query) {
      this.pagination.page = query && query.page ? Number.parseInt(query.page, 10) : 1
      this.filter.status = query && query.status ? query.status : this.filterDefaults.status
      this.filter.target = query && query.target ? query.target : this.filterDefaults.target
    },

    updateQueryParams () {
      this.$router.push({ query: this.getQueryParams() })
    },

    loadBots () {
      let statusFilter = `filter[status]=${this.filter.status}`
      if (this.filter.status === 'running') {
        statusFilter += '&filter[status]=pending&filter[status]=canceling'
      }
      const targetFilter = `filter[target]=${this.filter.target}`

      this.axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/bots?${statusFilter}&${targetFilter}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}`)
        .then(response => {
          this.bots = response.data.items
          this.pagination = response.data.pagination

          this.loaded = true
        })
        .catch(e => {
          this.periodicallyRefreshBot(15)
        })
    },

    periodicallyRefreshBot (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadBots, timeoutWithJitter)
      }
    },

    setTarget (value) {
      this.filter.target = value
      this.updateQueryParams()
    }
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    })
  },

  watch: {
    '$route' (to, from) {
      this.setDataFromQueryParams(to.query)
      this.loadBots()
    },

    pipeline: {
      handler: function (to, from) {
        this.loadBots()
      },
      deep: true
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

<style scoped>
tbody tr {
  cursor: pointer;
}
</style>
