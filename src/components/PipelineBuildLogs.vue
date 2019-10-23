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
              v-if="step.runIndex && step.runIndex > 0"
              class="small text-muted"
              :title="'Retry '+step.runIndex"
            >
              (retry {{ step.runIndex }})
            </span>
            <span
              v-if="step.autoInjected"
              class="small text-muted"
              title="This step is automatically injected by Estafette CI"
            >
              (injected)
            </span>
          </div>
          <div class="col-4 col-xl-3 d-none d-lg-flex text-truncate">
            <span v-if="step.image && step.image.name">
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
            <span v-if="step.image && step.image.name && (step.status == 'RUNNING' || step.status == 'SUCCEEDED' || step.status == 'FAILED')">
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
            <span v-if="step.image && step.image.name && (step.status == 'RUNNING' || step.status == 'SUCCEEDED' || step.status == 'FAILED')">
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

        <b-card-header
          class="row m-0 pt-3 pr-2 pb-3 pl-2 border-0 rounded-0 p-3 align-items-center text-center"
          v-if="step.nestedSteps && step.nestedSteps.length > 0"
          role="tab"
        >
          <b-button
            v-for="nestedStep in step.nestedSteps"
            :key="nestedStep.step"
            v-b-toggle="'accordion-'+step.step + '-' + step.runIndex + '-' +nestedStep.step"
            :variant="nestedStep.status | bootstrapVariant(true)"
            class="mr-2 mb-1"
          >
            {{ nestedStep.step }}
            <span>
              {{ nestedStep.image.pullDuration + nestedStep.duration | formatDuration }}
            </span>
          </b-button>
        </b-card-header>

        <b-collapse
          class="container-fluid collapse p-0"
          :id="'accordion-'+step.step + '-' + step.runIndex"
          :visible="step.status === 'RUNNING' || step.status === 'FAILED'"
          accordion="log-steps-accordion"
          role="tabpanel"
        >
          <div
            class="text-light text-monospace bg-dark m-0 p-3"
            v-if="step.logLines.length > 0"
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
          </div>
        </b-collapse>

        <b-collapse
          class="container-fluid collapse p-0"
          v-for="nestedStep in step.nestedSteps"
          :key="nestedStep.step"
          :id="'accordion-'+step.step + '-' + step.runIndex + '-' +nestedStep.step"
          accordion="log-steps-accordion"
          role="tabpanel"
        >
          <div class="row m-0 pt-3 pr-2 pb-3 pl-2 clickable border-0 rounded-0 bg-light">
            <div class="col-4 col-md-2 col-xl-1 text-center" />
            <div
              class="col-8 col-lg-5 col-xl-4 text-truncate h4"
              :title="nestedStep.step"
            />
            <div class="col-4 col-xl-3 d-none d-lg-flex text-truncate">
              <span v-if="nestedStep.image && nestedStep.image.name">
                {{ nestedStep.image.name }}:{{ nestedStep.image.tag }}
                <span
                  v-if="nestedStep.image.isTrusted"
                  class="small text-muted"
                  title="This image is configured as trusted by Estafette CI"
                >
                  (trusted)
                </span>
              </span>
            </div>
            <div class="col-1 text-right d-none d-xl-flex">
              <span v-if="nestedStep.image && nestedStep.image.name && (nestedStep.status == 'RUNNING' || nestedStep.status == 'SUCCEEDED' || nestedStep.status == 'FAILED')">
                <span v-if="nestedStep.image && nestedStep.image.imageSize">
                  {{ nestedStep.image.imageSize | formatBytes }}
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
              <span v-if="nestedStep.image && nestedStep.image.name && (nestedStep.status == 'RUNNING' || nestedStep.status == 'SUCCEEDED' || nestedStep.status == 'FAILED')">
                <span v-if="nestedStep.image.pullDuration && nestedStep.image.pullDuration > 0">
                  {{ nestedStep.image.pullDuration | formatDuration }}
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
              <span v-if="nestedStep.duration && (nestedStep.status == 'SUCCEEDED' || nestedStep.status == 'FAILED')">
                {{ nestedStep.duration | formatDuration }}
              </span>
            </div>
            <div class="col-2 col-lg-1 text-right d-none d-md-flex">
              <span v-if="nestedStep.image && (nestedStep.status == 'RUNNING' || nestedStep.status == 'SUCCEEDED' || nestedStep.status == 'FAILED')">
                {{ nestedStep.image.pullDuration + nestedStep.duration | formatDuration }}
              </span>
            </div>
          </div>

          <div
            class="text-light text-monospace bg-dark m-0 p-3"
            v-if="nestedStep.logLines.length > 0"
          >
            <div
              class="row no-gutters"
              v-for="(line, lineIndex) in nestedStep.logLines"
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
          </div>
        </b-collapse>
      </b-card>
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
import { BButton, BCard, BCardHeader, BCollapse, VBToggle, BFormCheckbox, BFormGroup } from 'bootstrap-vue'

export default {
  components: {
    BButton,
    BCard,
    BCardHeader,
    BCollapse,
    BFormCheckbox,
    BFormGroup
  },
  directives: {
    'b-toggle': VBToggle
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
    build: {
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
      if (this.build.buildStatus === 'succeeded' || this.build.buildStatus === 'failed' || this.build.buildStatus === 'canceled') {
        this.axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/builds/${this.id}/logs`)
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
      if (this.build.buildStatus === 'pending' || this.build.buildStatus === 'running' || this.build.buildStatus === 'canceling') {
        this.es = new EventSource(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/builds/${this.id}/logs.stream`)

        this.es.addEventListener('log', event => {
          if (this.build.buildStatus !== 'pending' && this.build.buildStatus !== 'running' && this.build.buildStatus !== 'canceling') {
            // stop handling stream when build status changes
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

          if (!!data.depth || data.depth === 0) {
            var stepIndex = this.tailedSteps.findIndex(s => s === data.step)
            var step = stepIndex > -1 ? this.log.steps[stepIndex] : null
            if (stepIndex === -1) {
              // create new step
              if (data.image) {
                step = { step: data.step, image: data.image, logLines: [], nestedSteps: [], exitCode: 0, status: 'RUNNING', autoInjected: data.autoInjected ? data.autoInjected : false, duration: 0 }
              } else {
                step = { step: data.step, logLines: [], nestedSteps: [], exitCode: 0, status: 'RUNNING', autoInjected: false, duration: 0 }
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
          } else {
            // a nested stage, see if it exists in the last outer stage, otherwise add it (still at risk when the event stream restarts)
            if (this.log.steps.length > 0) {
              // get last outer step
              var lastStep = this.log.steps[this.log.steps.length - 1]

              var nestedStepIndex = lastStep.nestedSteps.findIndex(ns => ns.step === data.step)
              var nestedStep = nestedStepIndex > -1 ? lastStep.nestedSteps[nestedStepIndex] : null
              if (nestedStepIndex === -1) {
                // create new nested step
                if (data.image) {
                  nestedStep = { step: data.step, image: data.image, logLines: [], exitCode: 0, status: 'RUNNING', autoInjected: data.autoInjected ? data.autoInjected : false, duration: 0 }
                } else {
                  nestedStep = { step: data.step, logLines: [], exitCode: 0, status: 'RUNNING', autoInjected: false, duration: 0 }
                }
                lastStep.nestedSteps.push(nestedStep)
                nestedStepIndex = lastStep.nestedSteps.length - 1

                // reset last line number
                this.lastLineNumber = 0
              }
            }

            if (data.status) {
              nestedStep.status = data.status
            }
            if (data.exitCode) {
              nestedStep.exitCode = data.exitCode
            }
            if (data.duration) {
              nestedStep.duration = data.duration
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
