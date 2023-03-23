<template>
  <div
    class="migration-notice"
    v-if="migration && migration.status === 'completed'"
  >
    <b-alert
      show
      variant="primary"
    >
      <h5>Migrated on {{ migration.updatedAt | moment('YYYY/MM/DD HH:mm:ss') }}</h5>
      <p>
        This repository has been migrated. Redirecting to
        <b-link
          :href="redirectURL"
          class="alert-link"
        >
          {{ redirectURLText }}
        </b-link>
      </p>
      <div class="redirect-progress">
        <b-button
          @click="toggleCountDown"
          class="start-pause-button"
          variant="outline-secondary"
        >
          {{ this.pause ? '▶︎' : '❙❙' }}
        </b-button>
        <b-progress
          variant="primary"
          :max="maxCount"
          :value="currentCount"
          height="8px"
        />
      </div>
    </b-alert>
  </div>
</template>

<script>
import { BAlert, BButton, BLink, BProgress } from 'bootstrap-vue'

const INTERVAL_TIMEOUT_MS = 100
const COUNT_DOWN_TIMEOUT_MS = 4000
const MAX_COUNT = COUNT_DOWN_TIMEOUT_MS / INTERVAL_TIMEOUT_MS
export default {
  components: {
    BAlert,
    BLink,
    BProgress,
    BButton
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
    id: {
      type: String,
      default: null
    },
    page: {
      type: String,
      default: 'overview'
    }
  },
  mounted () {
    this.fetchData()
  },
  data: () => ({
    maxCount: MAX_COUNT,
    currentCount: MAX_COUNT,
    pause: localStorage.getItem('redirect-migrated') === 'true',
    interval: null,
    migration: null,
    pipeline: null,
    redirectURL: null,
    redirectURLText: null,
    intervalTimeoutMs: INTERVAL_TIMEOUT_MS
  }),
  methods: {
    startCountDown () {
      clearInterval(this.interval)
      if (this.migration && this.migration.status === 'completed') {
        return setInterval(() => {
          this.currentCount--
        }, this.intervalTimeoutMs)
      }
      return null
    },
    toggleCountDown () {
      this.pause = !this.pause
    },
    fetchData () {
      this.axios.get(`/api/migrations/from/${this.repoSource}/${this.repoOwner}/${this.repoName}`)
        .then(response => {
          if (response.data) {
            this.migration = response.data
            if (!this.pause) {
              this.pause = false
            }
            if (!this.id) {
              this.redirectURL = `/pipelines/${this.migration.toSource}/${this.migration.toOwner}/${this.migration.toName}/${this.page}`
              this.redirectURLText = `${this.migration.toSource}/${this.migration.toOwner}/${this.migration.toName}/${this.page}`
            }
          }
        }).catch(e => {
          console.debug('pipeline might not have been migrated', e)
        })
      if (this.id) {
        this.axios.get(`/api/migrations/${this.page}/${this.id}`)
          .then(response => {
            if (response.data) {
              this.pipeline = response.data
              this.redirectURL = `/pipelines/${this.pipeline.repoSource}/${this.pipeline.repoOwner}/${this.pipeline.repoName}/${this.page}/${this.pipeline.id}`
              this.redirectURLText = `${this.pipeline.repoSource}/${this.pipeline.repoOwner}/${this.pipeline.repoName}/${this.page}/${this.pipeline.id}`
            }
          }).catch(e => {
            console.error(`no migrated ${this.page} found`, e)
          })
      }
    }
  },
  watch: {
    pause (val) {
      localStorage.setItem('redirect-migrated', val.toString())
      if (val) {
        clearInterval(this.interval)
        return
      }
      this.interval = this.startCountDown()
    },
    currentCount (val) {
      if (val < -4) {
        window.location.href = this.redirectURL
      }
    },
    redirectURL (to, from) {
      if (to !== from && !!to) {
        this.maxCount = MAX_COUNT
        this.currentCount = MAX_COUNT
        this.intervalTimeoutMs = INTERVAL_TIMEOUT_MS
        if (!this.pause) {
          this.interval = this.startCountDown()
        }
      }
    },
    page (to, from) {
      if (to !== from && !!to) {
        this.fetchData()
      }
    }
  }
}
</script>
