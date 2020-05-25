<template>
  <div class="m-3">
    <div class="row">
      <div class="col-12">
        <b-jumbotron
          lead="Your portal to application development & management"
          bg-variant="white"
          text-variant="dark"
          header-level="3"
          container-fluid
          fluid
          class="mb-3 pl-4 pt-4 pr-4 pb-5 rounded border"
        >
          <template
            v-slot:header
          >
            <span class="text-success font-italic">
              Estafette
            </span>
          </template>

          <p>For more information visit the public website.</p>

          <b-button
            variant="success"
            href="https://estafette.io/"
            target="_blank"
          >
            Learn more
          </b-button>
        </b-jumbotron>
      </div>

      <div class="col-12 col-md-6 col-xxxl-3">
        <b-jumbotron
          header="Builds & releases"
          lead="View and release applications"
          bg-variant="success"
          text-variant="white"
          header-level="4"
          container-fluid
          fluid
          class="mb-3 p-3 rounded border"
        >
          <b-button
            variant="light"
            :to="{ name: 'Pipelines' }"
          >
            See more
          </b-button>
        </b-jumbotron>
      </div>

      <div class="col-12 col-md-6 col-xxxl-3">
        <b-jumbotron
          header="Catalog"
          lead="View ownership, performance and more"
          bg-variant="info"
          text-variant="white"
          header-level="4"
          container-fluid
          fluid
          class="mb-3 p-3 rounded border"
        >
          <b-button
            variant="light"
            :to="{ name: 'Pipelines' }"
          >
            See more
          </b-button>
        </b-jumbotron>
      </div>

      <div class="col-12 col-md-6 col-xxxl-3">
        <b-jumbotron
          header="Insights"
          lead="See stats, rankings and trends"
          bg-variant="primary"
          text-variant="white"
          header-level="4"
          container-fluid
          fluid
          class="mb-3 p-3 rounded border"
        >
          <b-button
            variant="light"
            :to="{ name: 'Statistics' }"
          >
            See more
          </b-button>
        </b-jumbotron>
      </div>

      <div class="col-12 col-md-6 col-xxxl-3">
        <b-jumbotron
          header="Create"
          lead="Generate manifests and secrets"
          bg-variant="warning"
          text-variant="dark"
          header-level="4"
          container-fluid
          fluid
          class="mb-3 p-3 rounded border"
        >
          <b-button
            variant="light"
            :to="{ name: 'Manifest' }"
          >
            See more
          </b-button>
        </b-jumbotron>
      </div>
    </div>

    <div
      v-if="user && user.authenticated"
      class="row m-0 mt-3 mb-3 ml-3 justify-content-center"
    >
      <div class="h5 text-center mt-3 text-secondary">
        Pipelines you recently committed to
      </div>
    </div>
    <div
      v-if="user && user.authenticated"
      class="row"
    >
      <div class="row-header m-3">
        <div class="col-3">
          Pipeline
        </div>
        <div class="col-1">
          Version
        </div>
        <div class="col-1">
          Status
        </div>
        <div class="col-2">
          Built
        </div>
        <div class="col-1">
          Branch
        </div>
        <div class="col-1">
          Revision
        </div>
        <div class="col-3">
          Commit(s)
        </div>
      </div>

      <transition-group
        name="list-complete"
        tag="div"
        v-if="pipelines.length > 0"
        class="m-3"
      >
        <pipeline-row
          v-for="pipeline in pipelines"
          :key="pipeline.repoSource+'/'+pipeline.repoOwner+'/'+pipeline.repoName"
          :pipeline="pipeline"
          :filter="filter"
        />
      </transition-group>
      <div
        v-else-if="loaded"
        class="alert alert-warning text-center p-5 m-3"
      >
        There are no pipelines for the current filters. Please increase the time range or remove some filters!
      </div>
      <div v-else>
        <spinner color="primary" />
      </div>
    </div>
  </div>
</template>

<script>
import { BJumbotron, BButton } from 'bootstrap-vue'
import { mapState } from 'vuex'
import Spinner from '@/components/Spinner'
import PipelineRow from '@/components/PipelineRow'

export default {
  components: {
    BJumbotron,
    BButton,
    Spinner,
    PipelineRow
  },

  data: function () {
    return {
      pipelines: [],
      pagination: {
        page: 1,
        size: 12,
        totalPages: 0,
        totalItems: 0
      },
      filter: {
        status: 'all',
        since: '1d',
        labels: '',
        search: ''
      },
      loaded: false,
      refresh: true
    }
  },

  created () {
    this.loadPipelines()
  },

  methods: {
    loadPipelines () {
      if (!this.user || !this.user.authenticated) {
        this.periodicallyRefreshPipelines(30)
      }
      this.axios.get(`/api/pipelines?filter[since]=1w&filter[user]=${this.user.email}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}`)
        .then(response => {
          this.pipelines = response.data.items
          this.pagination = response.data.pagination

          this.loaded = true

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

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

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
    }
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    })
  }
}
</script>
