<template>
  <div
    v-if="steps && steps.length > 0"
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

    <b-form-group
      v-if="hasTruncatedLogs"
      :description="'Estafette truncates logs when a stage has more than '+maxLinesToShow+' lines. Check to see the full logs.'"
      class="m-3"
    >
      <b-form-checkbox v-model="showTruncatedLogs">
        Show full logs
      </b-form-checkbox>
    </b-form-group>

    <div class="row-header">
      <div class="col-1 text-center">
        Status
      </div>
      <div class="col-4">
        Stage
      </div>
      <div class="col-3">
        Image
      </div>
      <div class="col-1 text-right">
        Image size
      </div>
      <div class="col-1 text-right">
        Pull time
      </div>
      <div class="col-1 text-right">
        Execution time
      </div>
      <div class="col-1 text-right">
        Total time
      </div>
    </div>

    <div role="tablist">
      <b-card
        no-body
        v-for="step in filteredSteps"
        :key="step.key"
        class="log-stage-block"
      >
        <b-card-header
          class="row m-0 pt-3 pr-2 pb-3 pl-2 clickable border-0 rounded-0"
          v-b-toggle="step.collapseID"
          role="tab"
        >
          <property-block
            label="Status"
            class="col-xxxl-1 text-xxxl-center"
          >
            <span
              class="badge mt-2"
              :class="step.status | bootstrapClass('badge')"
            >
              {{ step.status }}
            </span>
            <log-warning
              :step="step"
              :max-lines-to-show="maxLinesToShow"
            />
          </property-block>
          <property-block
            label="Stage"
            class="col-xxxl-4"
            value-css-class="h4"
          >
            {{ step.step }}
            <span
              v-if="step.autoInjected"
              class="small text-muted"
              title="This step is automatically injected by Estafette CI"
            >
              (injected)
            </span>
          </property-block>
          <property-block
            label="Image"
            class="col-xxxl-3"
          >
            <span v-if="step.image && step.image.name">
              {{ step.image.name }}:{{ step.image.tag }}
              <font-awesome-icon
                v-if="step.image.isTrusted"
                icon="shield-alt"
                class="small text-muted"
                title="This image is configured as trusted by Estafette CI"
              />
            </span>
            <span v-else>
              -
            </span>
          </property-block>
          <property-block
            label="Image size"
            class="d-none d-xxxl-block col-xxxl-1 text-xxxl-right"
          >
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
            <span v-else>
              -
            </span>
          </property-block>
          <property-block
            label="Pull time"
            class="d-none d-xxxl-block col-xxxl-1 text-xxxl-right"
          >
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
            <span v-else>
              -
            </span>
          </property-block>
          <property-block
            label="Execution time"
            class="d-none d-xxxl-block col-xxxl-1 text-xxxl-right"
          >
            <span v-if="step.duration && (step.status == 'SUCCEEDED' || step.status == 'FAILED')">
              {{ step.duration | formatDuration }}
            </span>
            <span v-else>
              -
            </span>
          </property-block>
          <property-block
            label="Total time"
            class="col-xxxl-1 text-xxxl-right"
          >
            <span v-if="step.image && (step.status == 'RUNNING' || step.status == 'SUCCEEDED' || step.status == 'FAILED')">
              {{ (step.image ? step.image.pullDuration : 0) + step.duration | formatDuration }}
            </span>
            <span v-else>
              -
            </span>
          </property-block>
        </b-card-header>

        <b-card-header
          class="row m-0 p-2 border-0 rounded-0 justify-content-center"
          v-if="step.services && step.services.length > 0"
          role="tab"
        >
          <property-block
            label="Service containers"
            wide
            label-css-class="d-xxxl-block"
          >
            <b-button
              v-for="service in step.services"
              :key="service.key"
              v-b-toggle="service.collapseID"
              :variant="service.status | bootstrapVariant(true)"
              class="mr-2 mb-1"
            >
              {{ service.step }}
              <span>
                {{ (service.image ? service.image.pullDuration : 0) + service.duration | formatDuration }}
              </span>
              <log-warning
                :step="service"
                :max-lines-to-show="maxLinesToShow"
              />
            </b-button>
          </property-block>
        </b-card-header>

        <b-card-header
          class="row m-0 p-2 border-0 rounded-0 justify-content-center"
          v-if="step.nestedSteps && step.nestedSteps.length > 0"
          role="tab"
        >
          <property-block
            label="Parallel stages"
            wide
            label-css-class="d-xxxl-block"
          >
            <b-button
              v-for="nestedStep in step.nestedSteps"
              :key="nestedStep.key"
              v-b-toggle="nestedStep.collapseID"
              :variant="nestedStep.status | bootstrapVariant(true)"
              class="mr-2 mb-1"
            >
              {{ nestedStep.step }}
              <span>
                {{ (nestedStep.image ? nestedStep.image.pullDuration : 0) + nestedStep.duration | formatDuration }}
              </span>
              <log-warning
                :step="nestedStep"
                :max-lines-to-show="maxLinesToShow"
              />
            </b-button>
          </property-block>
        </b-card-header>

        <b-collapse
          class="container-fluid collapse p-0 rounded-bottom"
          :id="step.collapseID"
          :visible="step.status === 'RUNNING' || step.status === 'FAILED'"
          accordion="log-steps-accordion"
          role="tabpanel"
          v-slot="{ visible }"
        >
          <div
            v-if="visible && step.logLines && step.logLines.length > 0"
            class="text-light text-monospace bg-dark m-0 p-3"
          >
            <div
              class="row no-gutters"
              v-for="(line, lineIndex) in cappedLogLines(step.logLines)"
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
          class="container-fluid collapse p-0 rounded-bottom"
          v-for="service in step.services"
          :key="service.collapseID"
          :id="service.collapseID"
          accordion="log-steps-accordion"
          role="tabpanel"
          v-slot="{ visible }"
        >
          <div
            v-if="visible"
            class="row m-0 pt-3 pr-2 pb-3 pl-2 border-0 rounded-0 bg-light"
          >
            <div class="col-4 col-md-2 col-xl-1 text-center" />
            <div
              class="col-8 col-lg-5 col-xl-4 text-truncate h4"
              :title="service.step"
            />
            <div class="col-4 col-xl-3 d-none d-lg-flex text-truncate">
              <span v-if="service.image && service.image.name">
                {{ service.image.name }}:{{ service.image.tag }}
                <font-awesome-icon
                  v-if="service.image.isTrusted"
                  icon="shield-alt"
                  class="small text-muted"
                  title="This image is configured as trusted by Estafette CI"
                />
              </span>
            </div>
            <div class="col-1 text-right d-none d-xl-flex">
              <span v-if="service.image && service.image.name && (service.status == 'RUNNING' || service.status == 'SUCCEEDED' || service.status == 'FAILED')">
                <span v-if="service.image && service.image.imageSize">
                  {{ service.image.imageSize | formatBytes }}
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
              <span v-if="service.image && service.image.name && (service.status == 'RUNNING' || service.status == 'SUCCEEDED' || service.status == 'FAILED')">
                <span v-if="service.image.pullDuration && service.image.pullDuration > 0">
                  {{ service.image.pullDuration | formatDuration }}
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
              <span v-if="service.duration && (service.status == 'SUCCEEDED' || service.status == 'FAILED')">
                {{ service.duration | formatDuration }}
              </span>
            </div>
            <div class="col-2 col-lg-1 text-right d-none d-md-flex">
              <span v-if="service.image && (service.status == 'RUNNING' || service.status == 'SUCCEEDED' || service.status == 'FAILED')">
                {{ (service.image ? service.image.pullDuration : 0) + service.duration | formatDuration }}
              </span>
            </div>
          </div>

          <div
            class="text-light text-monospace bg-dark m-0 p-3"
            v-if="service.logLines && service.logLines.length > 0"
          >
            <div
              class="row no-gutters"
              v-for="(line, lineIndex) in cappedLogLines(service.logLines)"
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
          class="container-fluid collapse p-0 rounded-bottom"
          v-for="nestedStep in step.nestedSteps"
          :key="nestedStep.collapseID"
          :id="nestedStep.collapseID"
          accordion="log-steps-accordion"
          role="tabpanel"
          v-slot="{ visible }"
        >
          <div
            v-if="visible"
            class="row m-0 pt-3 pr-2 pb-3 pl-2 border-0 rounded-0 bg-light"
          >
            <div class="col-4 col-md-2 col-xl-1 text-center" />
            <div
              class="col-8 col-lg-5 col-xl-4 text-truncate h4"
              :title="nestedStep.step"
            />
            <div class="col-4 col-xl-3 d-none d-lg-flex text-truncate">
              <span v-if="nestedStep.image && nestedStep.image.name">
                {{ nestedStep.image.name }}:{{ nestedStep.image.tag }}
                <font-awesome-icon
                  v-if="nestedStep.image.isTrusted"
                  icon="shield-alt"
                  class="small text-muted mb-1"
                  title="This image is configured as trusted by Estafette CI"
                />
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
                {{ (nestedStep.image ? nestedStep.image.pullDuration : 0) + nestedStep.duration | formatDuration }}
              </span>
            </div>
          </div>

          <div
            class="text-light text-monospace bg-dark m-0 p-3"
            v-if="nestedStep.logLines && nestedStep.logLines.length > 0"
          >
            <div
              class="row no-gutters"
              v-for="(line, lineIndex) in cappedLogLines(nestedStep.logLines)"
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

    <div class="log-summary-block">
      <property-block
        label="Status"
        class="col-xxxl-1 text-xxxl-center"
      >
        <span
          class="badge"
          :class="totalStatus | bootstrapClass('badge')"
        >
          {{ totalStatus }}
        </span>
      </property-block>
      <div class="property-block col-xxxl-4" />
      <div class="property-block col-xxxl-3" />
      <property-block
        label="Total image size"
        class="d-none d-xxxl-block col-xxxl-1 text-xxxl-right"
      >
        {{ totalImageSize | formatBytes }}
      </property-block>
      <property-block
        label="Total pull time"
        class="d-none d-xxxl-block col-xxxl-1 text-xxxl-right"
      >
        {{ totalPullDuration | formatDuration }}
      </property-block>
      <property-block
        label="Total execution time"
        class="d-none d-xxxl-block col-xxxl-1 text-xxxl-right"
      >
        {{ totalDuration | formatDuration }}
      </property-block>
      <property-block
        label="Total time"
        class="col-xxxl-1 text-xxxl-right"
      >
        {{ totalPullDuration + totalDuration | formatDuration }}
      </property-block>
    </div>

    <div
      class="log-buttons"
    >
      <b-nav
        vertical
      >
        <b-nav-item @click="scrollUp">
          <font-awesome-icon
            icon="chevron-up"
            class="sidebar-icon"
          />
        </b-nav-item>
        <b-nav-item
          v-if="isTailing()"
          @click="scrollToggle"
        >
          <font-awesome-icon
            :icon="scrollEnabled ? 'eye-slash' : 'eye'"
            class="sidebar-icon"
          />
        </b-nav-item>
        <b-nav-item @click="scrollDown">
          <font-awesome-icon
            icon="chevron-down"
            class="sidebar-icon"
          />
        </b-nav-item>
      </b-nav>
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
import debounce from 'lodash/debounce'

import AnsiUp from 'ansi_up'
import { BButton, BCard, BCardHeader, BCollapse, VBToggle, BFormCheckbox, BFormGroup, BNav, BNavItem } from 'bootstrap-vue'

import PropertyBlock from '@/components/PropertyBlock'
import LogWarning from '@/components/LogWarning'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faShieldAlt, faEye, faEyeSlash, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShieldAlt, faEye, faEyeSlash, faChevronUp, faChevronDown)

export default {
  components: {
    BButton,
    BCard,
    BCardHeader,
    BCollapse,
    BFormCheckbox,
    BFormGroup,
    PropertyBlock,
    LogWarning,
    FontAwesomeIcon,
    BNav,
    BNavItem
  },
  directives: {
    'b-toggle': VBToggle
  },
  props: {
    logUrl: {
      type: String,
      default: null
    },
    status: {
      type: String,
      default: null
    }
  },
  data: function () {
    return {
      steps: [],
      refresh: true,
      tailedSteps: [],
      showInjectedStages: false,
      maxLinesToShow: 1000,
      maxLinesToShowWhenTailing: 250,
      showTruncatedLogs: false,
      scrollEnabled: true
    }
  },

  computed: {
    filteredSteps () {
      if (!this.steps) {
        return []
      }

      return this.steps.filter(step => !step.autoInjected || this.showInjectedStages || step.status === 'PENDING' || step.status === 'RUNNING' || step.status === 'FAILED').map(step => {
        step.key = step.step + '-' + (step.runIndex ? step.runIndex : 0)
        step.collapseID = 'accordion-' + step.key

        if (step.services) {
          step.services = step.services.map(service => {
            service.key = step.step + '-' + (step.runIndex ? step.runIndex : 0) + '-service-' + service.step
            service.collapseID = 'accordion-' + service.key

            return service
          })
        }

        if (step.nestedSteps) {
          step.nestedSteps = step.nestedSteps.map(nestedStep => {
            nestedStep.key = step.step + '-' + (step.runIndex ? step.runIndex : 0) + '-' + nestedStep.step
            nestedStep.collapseID = 'accordion-' + nestedStep.key

            return nestedStep
          })
        }

        return step
      })
    },

    totalImageSize: function () {
      if (!this.steps) {
        return 0
      }
      return this.steps.reduce((acc, step) => {
        return acc + (step.image && step.image.imageSize ? step.image.imageSize : 0)
      }, 0)
    },

    totalPullDuration: function () {
      if (!this.steps) {
        return 0
      }
      return this.steps.reduce((acc, step) => {
        return acc + (step.image && step.image.pullDuration ? step.image.pullDuration : 0)
      }, 0)
    },

    totalDuration: function () {
      if (!this.steps) {
        return 0
      }
      return this.steps.reduce((acc, step) => {
        return acc + (step.duration ? step.duration : 0)
      }, 0)
    },

    totalStatus: function () {
      if (!this.steps) {
        return ''
      }
      return this.steps.reduce((acc, step) => {
        if (acc === 'CANCELED' || step.status === 'CANCELED') {
          return 'CANCELED'
        }
        if (acc === 'FAILED' || step.status === 'FAILED') {
          return 'FAILED'
        }
        if (step.status === 'PENDING' || step.status === 'RUNNING') {
          return 'RUNNING'
        }
        return 'SUCCEEDED'
      }, 'SUCCEEDED')
    },

    hasTruncatedLogs () {
      return this.filteredSteps && this.filteredSteps.some(s =>
        (s.logLines && s.logLines.length > this.maxLinesToShow) ||
        (s.services && s.services.some(svc => svc.logLines && svc.logLines.length > this.maxLinesToShow)) ||
        (s.nestedSteps && s.nestedSteps.some(ns => ns.logLines && ns.logLines.length > this.maxLinesToShow))
      )
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
      if (this.status === 'succeeded' || this.status === 'failed' || this.status === 'canceled') {
        this.tailedSteps = []
        this.axios.get(this.logUrl)
          .then(response => {
            if (response.data.steps) {
              this.steps = response.data.steps
            } else {
              this.steps = response.data
            }
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

    cappedLogLines (logLines) {
      const firstLinesToShow = 5
      if (!logLines || logLines.length <= this.maxLinesToShow || this.showTruncatedLogs) {
        return logLines
      }

      var firstLines = logLines.slice(0, firstLinesToShow)
      var truncatedLines = logLines.slice(firstLinesToShow, firstLinesToShow + 3).map((l, i) => {
        if (i === 1) {
          return {
            line: l.line,
            timestamp: null,
            streamType: l.streamType,
            text: '== TOO MANY LINES; TRUNCATED BY ESTAFETTE =='
          }
        }

        return {
          line: l.line,
          timestamp: null,
          streamType: l.streamType,
          text: ' '
        }
      })
      var lastLines = logLines.slice(logLines.length - this.maxLinesToShow + firstLinesToShow + 3)

      // get first 5 lines and last 1955
      return firstLines.concat(truncatedLines).concat(lastLines)
    },

    isTailing () {
      return (this.status === 'pending' || this.status === 'running' || this.status === 'canceling')
    },

    tailLogs () {
      if (this.isTailing()) {
        this.es = new EventSource(`${this.logUrl}.stream`)

        this.es.addEventListener('log', event => {
          if (this.status !== 'pending' && this.status !== 'running' && this.status !== 'canceling') {
            // stop handling stream when release status changes
            this.es.close()
            document.getElementById('main').scrollIntoView(true)
            this.loadLogs()
            return
          }

          let data = JSON.parse(event.data)

          var stageType = 'stage'
          if (data.type) {
            stageType = data.type
          }

          if ((!data.type && (!data.depth || data.depth === 0)) || (data.type && stageType === 'stage' && !data.parentStage)) {
            var stepIndex = this.tailedSteps.findIndex(s => s === data.step)
            var step = stepIndex > -1 ? this.steps[stepIndex] : null
            if (stepIndex === -1) {
              // create new step
              var initialStatus = 'RUNNING'
              if (data.status) {
                initialStatus = data.status
              }
              step = { step: data.step, logLines: [], nestedSteps: [], services: [], exitCode: 0, status: initialStatus, autoInjected: data.autoInjected, duration: 0, lastLineNumber: 0 }
              this.tailedSteps.push(data.step)
              this.steps.push(step)
              stepIndex = this.steps.length - 1
            }

            if (stepIndex !== this.tailedSteps.length - 1) {
              // the data is not for the last step in the array, we're dealing with an event stream restart; skip processing until we catch up with the last step
              return
            }

            if (data.image) {
              step.image = data.image
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
              if (data.logLine.line > step.lastLineNumber) {
                step.logLines.push(data.logLine)
                step.lastLineNumber = data.logLine.line

                // tail only last n rows per stage to keep dom light
                if (data.logLine.line > this.maxLinesToShowWhenTailing) {
                  step.logLines.shift()
                }
              }
            }
          } else {
            // a nested stage, see if it exists in the last outer stage, otherwise add it (still at risk when the event stream restarts)
            if (this.steps.length > 0) {
              // get last outer step (or by name if parentStage property exists)
              var outerStep = this.steps[this.steps.length - 1]
              if (data.parentStage) {
                stepIndex = this.tailedSteps.findIndex(s => s === data.parentStage)
                if (stepIndex > -1) {
                  outerStep = this.steps[stepIndex]
                }
              }

              if (stageType === 'service') {
                var nestedStepIndex = outerStep.services.findIndex(ns => ns.step === data.step)
                var nestedStep = nestedStepIndex > -1 ? outerStep.services[nestedStepIndex] : null
                if (nestedStepIndex === -1) {
                  // create new nested service step
                  initialStatus = 'RUNNING'
                  if (data.status) {
                    initialStatus = data.status
                  }
                  nestedStep = { step: data.step, logLines: [], exitCode: 0, status: initialStatus, autoInjected: false, duration: 0, lastLineNumber: 0 }
                  outerStep.services.push(nestedStep)
                }
              } else {
                nestedStepIndex = outerStep.nestedSteps.findIndex(ns => ns.step === data.step)
                nestedStep = nestedStepIndex > -1 ? outerStep.nestedSteps[nestedStepIndex] : null
                if (nestedStepIndex === -1) {
                  // create new nested stage step
                  initialStatus = 'RUNNING'
                  if (data.status) {
                    initialStatus = data.status
                  }
                  nestedStep = { step: data.step, logLines: [], exitCode: 0, status: initialStatus, autoInjected: false, duration: 0, lastLineNumber: 0 }
                  outerStep.nestedSteps.push(nestedStep)
                }
              }

              if (data.image) {
                nestedStep.image = data.image
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

              if (data.logLine) {
                if (data.logLine.line > nestedStep.lastLineNumber) {
                  nestedStep.logLines.push(data.logLine)
                  nestedStep.lastLineNumber = data.logLine.line

                  // tail only last n rows per stage to keep dom light
                  if (data.logLine.line > this.maxLinesToShowWhenTailing) {
                    nestedStep.logLines.shift()
                  }
                }
              }
            }
          }

          this.scrollToLogTail()
        }, false)

        this.es.addEventListener('close', event => {
          this.es.close()
          document.getElementById('main').scrollIntoView(true)
          this.loadLogs()
        }, false)

        this.es.onerror = e => {
          console.warn(e)
        }
      } else {
        this.loadLogs()
      }
    },

    scrollToLogTail: debounce(
      function () {
        if (this.scrollEnabled) {
          this.$el.scrollIntoView(false)
        }
      },
      1000,
      { 'maxWait': 5000 }
    ),

    scrollToggle () {
      this.scrollEnabled = !this.scrollEnabled
    },

    scrollUp () {
      this.scrollEnabled = false
      window.scrollTo(0, 0)
    },

    scrollDown () {
      this.scrollEnabled = false
      window.scrollTo(0, document.body.scrollHeight)
    }
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

<style lang="scss" scoped>
.card-header {
  background: none;

  &:focus {
    box-shadow: none!important;
    outline: none;
  }
}

.log-timestamp {
  min-width: 200px;
  max-width: 200px;
}

.log-text {
  white-space: pre-wrap;
}
</style>
