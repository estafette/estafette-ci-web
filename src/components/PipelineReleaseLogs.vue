<template>
  <div
    v-if="log && log.steps"
    class="accordion m-3"
  >
    <b-form-group
      description="Estafette injects stages for handling cross-cutting concerns. Check to see the injected stages."
      class="m-3"
    >
      <b-form-checkbox v-model="showInjectedStages">
        Show injected stages
      </b-form-checkbox>
    </b-form-group>

    <div
      class="row rounded border pt-3 pr-2 pb-2 pl-2 mt-2 mr-0 mb-2 ml-0 font-weight-bold"
      v-if="!dashboardModeActive"
    >
      <div class="col-4 col-md-2 col-xl-1 text-center">
        Status
      </div>
      <div class="col-8 col-lg-5 col-xl-4">
        Stage
      </div>
      <div class="col-4 col-xl-3 d-none d-lg-flex">
        Image
      </div>
      <div class="col-1 text-right d-none d-xl-flex">
        Image size
      </div>
      <div class="col-1 text-right d-none d-xl-flex">
        Pull time
      </div>
      <div class="col-1 text-right d-none d-xl-flex">
        Execution time
      </div>
      <div class="col-2 col-lg-1 text-right d-none d-md-flex">
        Total time
      </div>
    </div>

    <div role="tablist">
      <b-card
        no-body
        v-for="step in filteredSteps"
        :key="step.step + '-' + step.runIndex"
        class="rounded border mt-2 mr-0 mb-2 ml-0 p-0"
        :class="step.status | bootstrapClass('border')"
      >
        <b-card-header
          class="row m-0 pt-3 pr-2 pb-3 pl-2 clickable border-0 rounded-0"
          v-b-toggle="'accordion-'+step.step + '-' + step.runIndex"
          role="tab"
        >
          <div class="col-4 col-md-2 col-xl-1 text-center">
            <span
              class="badge mt-2"
              :class="step.status | bootstrapClass('badge')"
            >
              {{ step.status }}
            </span>
          </div>
          <div
            class="col-8 col-lg-5 col-xl-4 text-truncate h4"
            :title="step.step"
          >
            {{ step.step }}
            <span
              v-if="step.autoInjected"
              class="small text-muted"
              title="This step is automatically injected by Estafette CI"
            >
              (injected)
            </span>
          </div>
          <div class="col-4 col-xl-3 d-none d-lg-flex text-truncate">
            <span v-if="step.image">
              {{ step.image.name }}:{{ step.image.tag }}
              <span
                v-if="step.image.isTrusted"
                class="small text-muted"
                title="This image is configured as trusted by Estafette CI"
              >
                (trusted)
              </span>
            </span>
          </div>
          <div class="col-1 text-right d-none d-xl-flex">
            <span v-if="step.image && (step.status == 'RUNNING' || step.status == 'SUCCEEDED' || step.status == 'FAILED')">
              <span v-if="step.image && step.image.imageSize">
                {{ step.image.imageSize | formatBytes }}
              </span>
              <em
                v-else
                class="text-muted"
              >
                (cached)
              </em>
            </span>
          </div>
          <div class="col-1 text-right d-none d-xl-flex">
            <span v-if="step.image && (step.status == 'RUNNING' || step.status == 'SUCCEEDED' || step.status == 'FAILED')">
              <span v-if="step.image.pullDuration && step.image.pullDuration > 0">
                {{ step.image.pullDuration | formatDuration }}
              </span>
              <em
                v-else
                class="text-muted"
              >
                (cached)
              </em>
            </span>
          </div>
          <div class="col-1 text-right d-none d-xl-flex">
            <span v-if="step.duration && (step.status == 'SUCCEEDED' || step.status == 'FAILED')">
              {{ step.duration | formatDuration }}
            </span>
          </div>
          <div class="col-2 col-lg-1 text-right d-none d-md-flex">
            <span v-if="step.image && (step.status == 'RUNNING' || step.status == 'SUCCEEDED' || step.status == 'FAILED')">
              {{ step.image.pullDuration + step.duration | formatDuration }}
            </span>
          </div>
        </b-card-header>

        <b-collapse
          class="container-fluid text-light text-monospace collapse bg-dark m-0 p-3"
          :id="'accordion-'+step.step + '-' + step.runIndex"
          :visible="step.status === 'RUNNING' || step.status === 'FAILED'"
          accordion="log-steps-accordion"
          role="tabpanel"
        >
          <div
            class="row no-gutters"
            v-for="(line, lineIndex) in step.logLines"
            :key="line.line ? line.line : lineIndex"
          >
            <div class="col-1 log-timestamp text-white-50 d-none d-xl-flex">
              {{ line.timestamp | moment('YYYY-MM-DD HH:mm:ss') }}
            </div>
            <div
              class="col log-text"
              v-html="formatLog(line.text)"
            />
          </div>
        </b-collapse>
      </b-card>
    </div>

    <div
      class="row rounded border mt-2 mr-0 mb-2 ml-0 pt-3 pr-2 pb-3 pl-2 font-weight-bold"
      :class="totalStatus | bootstrapClass('border')"
    >
      <div class="col-4 col-md-2 col-xl-1 text-center">
        <span
          class="badge"
          :class="totalStatus | bootstrapClass('badge')"
        >
          {{ totalStatus }}
        </span>
      </div>
      <div class="col-8 col-lg-5 col-xl-4" />
      <div class="col-4 col-xl-3 d-none d-lg-flex" />
      <div class="col-1 text-right d-none d-xl-flex">
        {{ totalImageSize | formatBytes }}
      </div>
      <div class="col-1 text-right d-none d-xl-flex">
        {{ totalPullDuration | formatDuration }}
      </div>
      <div class="col-1 text-right d-none d-xl-flex">
        {{ totalDuration | formatDuration }}
      </div>
      <div class="col-2 col-lg-1 text-right d-none d-md-flex">
        {{ totalPullDuration + totalDuration | formatDuration }}
      </div>
    </div>
  </div>
  <div
    v-else
    class="m-3"
  >
    Hold on, we're waiting for the logs to come in!
  </div>
</template>

<script>
import debounce from 'lodash.debounce'

import AnsiUp from 'ansi_up'
import bCard from 'bootstrap-vue/es/components/card/card'
import bCardHeader from 'bootstrap-vue/es/components/card/card-header'
import bCollapse from 'bootstrap-vue/es/components/collapse/collapse'
import bToggle from 'bootstrap-vue/es/directives/toggle/toggle'
import bFormCheckbox from 'bootstrap-vue/es/components/form-checkbox/form-checkbox'
import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group'

export default {
  components: {
    bCard,
    bCardHeader,
    bCollapse,
    bFormCheckbox,
    bFormGroup
  },
  directives: {
    bToggle
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
    releaseID: {
      type: String,
      default: null
    },
    release: {
      type: Object,
      default: null
    },
    dashboardModeActive: {
      type: Boolean,
      default: null
    }
  },
  data: function () {
    return {
      log: {},
      refresh: true,
      tailedSteps: [],
      lastLineNumber: 0,
      showInjectedStages: false
    }
  },

  computed: {
    filteredSteps () {
      if (!this.log || !this.log.steps) {
        return []
      }

      return this.log.steps.filter(step => !step.autoInjected || this.showInjectedStages || step.status === 'RUNNING' || step.status === 'FAILED')
    },

    totalImageSize: function () {
      if (!this.log || !this.log.steps) {
        return 0
      }
      return this.log.steps.reduce((acc, step) => {
        return acc + (step.image && step.image.imageSize ? step.image.imageSize : 0)
      }, 0)
    },

    totalPullDuration: function () {
      if (!this.log || !this.log.steps) {
        return 0
      }
      return this.log.steps.reduce((acc, step) => {
        return acc + (step.image && step.image.pullDuration ? step.image.pullDuration : 0)
      }, 0)
    },

    totalDuration: function () {
      if (!this.log || !this.log.steps) {
        return 0
      }
      return this.log.steps.reduce((acc, step) => {
        return acc + (step.duration ? step.duration : 0)
      }, 0)
    },

    totalStatus: function () {
      if (!this.log || !this.log.steps) {
        return ''
      }
      return this.log.steps.reduce((acc, step) => {
        if (acc === 'CANCELED' || step.status === 'CANCELED') {
          return 'CANCELED'
        }
        if (acc === 'FAILED' || step.status === 'FAILED') {
          return 'FAILED'
        }
        if (step.status === 'RUNNING') {
          return 'RUNNING'
        }
        return 'SUCCEEDED'
      }, 'SUCCEEDED')
    }
  },

  created () {
    this.tailLogs()
  },

  methods: {
    formatLog (value) {
      if (!value) return value
      var ansi = new AnsiUp()
      return ansi.ansi_to_html(value)
    },

    loadLogs () {
      if (this.release.releaseStatus === 'succeeded' || this.release.releaseStatus === 'failed' || this.release.releaseStatus === 'canceled') {
        this.axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/releases/${this.releaseID}/logs`)
          .then(response => {
            this.log = response.data
          })
          .catch(e => {
            this.periodicallyRefreshLogs(15)
          })
      } else {
        this.periodicallyRefreshLogs(5)
      }
    },

    periodicallyRefreshLogs (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadLogs, timeoutWithJitter)
      }
    },

    tailLogs () {
      if (this.release.releaseStatus === 'running' || this.release.releaseStatus === 'canceling') {
        this.es = new EventSource(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/releases/${this.releaseID}/logs/tail`)

        this.es.addEventListener('log', event => {
          if (this.release.releaseStatus !== 'running' && this.release.releaseStatus !== 'canceling') {
            // stop handling stream when release status changes
            this.es.close()
            document.getElementById('header-and-main').scrollIntoView(true)
            this.loadLogs()
            return
          }

          let data = JSON.parse(event.data)

          if (!this.log) {
            this.log = {}
          }
          if (!this.log.steps) {
            this.$set(this.log, 'steps', [])
          }

          var stepIndex = this.tailedSteps.findIndex(s => s === data.step)
          var step = stepIndex > -1 ? this.log.steps[stepIndex] : null
          if (stepIndex === -1) {
            // create new step
            if (data.image) {
              step = { step: data.step, image: data.image, logLines: [], exitCode: 0, status: 'RUNNING', autoInjected: data.autoInjected ? data.autoInjected : false, duration: 0 }
            } else {
              step = { step: data.step, logLines: [], exitCode: 0, status: 'RUNNING', autoInjected: false, duration: 0 }
            }
            this.tailedSteps.push(data.step)
            this.log.steps.push(step)
            stepIndex = this.log.steps.length - 1

            // reset last line number
            this.lastLineNumber = 0
          }

          if (stepIndex !== this.tailedSteps.length - 1) {
            // the data is not for the last step in the array, we're dealing with an event stream restart; skip processing until we catch up with the last step
            return
          }

          if (data.status) {
            step.status = data.status
          }
          if (data.exitCode) {
            step.exitCode = data.exitCode
          }
          if (data.duration) {
            step.duration = data.duration
          }

          if (data.logLine) {
            if (data.logLine.line > this.lastLineNumber) {
              step.logLines.push(data.logLine)
              this.lastLineNumber = data.logLine.line

              // tail only last 50 rows per stage to keep dom light
              if (data.logLine.line > 50) {
                step.logLines.shift()
              }

              this.scrollToLogTail()
            }
          }
        }, false)

        this.es.addEventListener('close', event => {
          this.es.close()
          document.getElementById('header-and-main').scrollIntoView(true)
          this.loadLogs()
        }, false)

        this.es.onerror = event => {
          console.log('EventSource failed.', event)
        }
      } else {
        this.loadLogs()
      }
    },

    scrollToLogTail: debounce(
      function () {
        this.$el.scrollIntoView(false)
      },
      125,
      { 'maxWait': 250 }
    )
  },

  beforeDestroy () {
    this.refresh = false
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
    if (this.es) {
      this.es.close()
    }
  }
}
</script>

<style scoped>
.clickable {
  cursor: pointer;
}

.card-header {
  background: none;
}

.log-timestamp {
  min-width: 200px;
  max-width: 200px;
}

.log-text {
  white-space: pre-wrap;
}
</style>
