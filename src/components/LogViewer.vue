<template>
  <div
    v-if="steps && steps.length > 0"
    class="accordion m-0"
  >
    <div role="tablist">
      <b-card
        no-body
        v-for="step in filteredSteps"
        :key="step.key"
        class="log-stage-block"
      >
        <b-card-header
          class="row m-0 pt-3 pr-2 pb-3 pl-2 clickable border-0 rounded-0"
          :class="step.status | bootstrapClass('text')"
          v-b-toggle="step.collapseID"
          role="tab"
        >
          <property-block
            label="Stage"
            label-css-class="pl-5"
            value-css-class="h4"
            :value="step.step"
          >
            <status-icon
              :status="step.status"
              style="width: 42px;"
            />
            {{ step.step }}
            <font-awesome-icon
              v-if="step.autoInjected"
              icon="bolt"
              class="small ml-2"
              v-b-tooltip.hover
              title="This stage is automatically injected by Estafette CI"
            />
          </property-block>
          <property-block
            label="Image"
            class="d-none d-lg-block"
          >
            <span
              v-if="step.image && step.image.name"
              :title="step.image.name+':'+step.image.tag"
            >
              {{ step.image.name }}:{{ step.image.tag }}
            </span>
            <span v-else>
              -
            </span>
            <log-stage-icons
              :step="step"
              :max-lines-to-show="maxLinesToShow"
            />
          </property-block>
          <property-block
            label="Image size"
            class="d-none d-xxl-block text-right"
          >
            <span v-if="step.image && step.image.name && (step.status == 'RUNNING' || step.status == 'SUCCEEDED' || step.status == 'FAILED')">
              <span
                v-if="step.image && step.image.imageSize"
                :title="step.image.imageSize | formatBytes"
              >
                {{ step.image.imageSize | formatBytes }}
              </span>
              <em
                v-else
              >
                -
              </em>
            </span>
            <span v-else>
              -
            </span>
          </property-block>
          <property-block
            label="Pull time"
            class="d-none d-xxxl-block col-xxxl-1 text-right"
          >
            <span v-if="step.image && step.image.name && (step.status == 'RUNNING' || step.status == 'SUCCEEDED' || step.status == 'FAILED')">
              <span
                v-if="step.image.pullDuration && step.image.pullDuration > 0"
                :title="step.image.pullDuration | formatDuration"
              >
                {{ step.image.pullDuration | formatDuration }}
              </span>
              <em
                v-else
              >
                -
              </em>
            </span>
            <span v-else>
              -
            </span>
          </property-block>
          <property-block
            label="Execution time"
            class="d-none d-xxxl-block col-xxxl-1 text-right"
            :value="step.duration | formatDuration"
          >
            <span v-if="step.duration && (step.status == 'SUCCEEDED' || step.status == 'FAILED')">
              {{ step.duration | formatDuration }}
            </span>
            <span v-else>
              -
            </span>
          </property-block>
          <property-block
            label="Stage time"
            class="d-none d-md-block pr-5 col-xxxl-1 text-right"
            :value="(step.image ? step.image.pullDuration : 0) + step.duration | formatDuration"
          >
            <span v-if="step.status == 'RUNNING' || step.status == 'SUCCEEDED' || step.status == 'FAILED'">
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
            class="text-center"
            wide
            label-css-class="d-xxxl-block"
          >
            <b-button
              v-for="service in step.services"
              :key="service.key"
              v-b-toggle="service.collapseID"
              :variant="service.status | bootstrapVariant(true)"
              class="mr-2 mb-1"
              :title="service.step"
            >
              {{ service.step }}
              <span>
                {{ (service.image ? service.image.pullDuration : 0) + service.duration | formatDuration }}
              </span>
              <log-stage-icons
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
            class="text-center"
            wide
            label-css-class="d-xxxl-block"
          >
            <b-button
              v-for="nestedStep in step.nestedSteps"
              :key="nestedStep.key"
              v-b-toggle="nestedStep.collapseID"
              :variant="nestedStep.status | bootstrapVariant(true)"
              class="mr-2 mb-1"
              :title="nestedStep.step"
            >
              {{ nestedStep.step }}
              <span>
                {{ (nestedStep.image ? nestedStep.image.pullDuration : 0) + nestedStep.duration | formatDuration }}
              </span>
              <log-stage-icons
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
          <log-stage-detail
            :visible="visible && step.logLines && step.logLines.length > 0"
            :step="step"
            :max-lines-to-show="maxLinesToShow"
            :show-timestamps="showTimestamps"
            :show-truncated-logs="showTruncatedLogs"
          />
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
          <log-stage-detail
            :visible="visible"
            :step="service"
            :max-lines-to-show="maxLinesToShow"
            :show-timestamps="showTimestamps"
            :show-truncated-logs="showTruncatedLogs"
          />
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
          <log-stage-detail
            :visible="visible"
            :step="nestedStep"
            :max-lines-to-show="maxLinesToShow"
            :show-timestamps="showTimestamps"
            :show-truncated-logs="showTruncatedLogs"
          />
        </b-collapse>
      </b-card>
    </div>

    <div
      class="log-summary-block"
      :class="totalStatus | bootstrapClass('text')"
    >
      <div class="property-block" />
      <div class="property-block d-none d-lg-block" />
      <property-block
        label="Total image size"
        class="d-none d-xxl-block text-right"
        :value="totalImageSize | formatBytes"
      />
      <property-block
        label="Total pull time"
        class="d-none d-xxxl-block col-xxxl-1 text-right"
        :value="totalPullDuration | formatDuration"
      />
      <property-block
        label="Total execution time"
        class="d-none d-xxxl-block col-xxxl-1 text-right"
        :value="totalDuration | formatDuration"
      />
      <property-block
        label="Total time"
        class="d-none d-md-block pr-5 col-xxxl-1 text-right"
        :value="totalPullDuration + totalDuration | formatDuration"
      />
    </div>

    <div
      class="log-buttons"
    >
      <b-button-group
        vertical
      >
        <b-button
          @click="scrollUp"
          v-b-tooltip.hover.left
          title="Scroll up"
          size="lg"
        >
          <font-awesome-icon
            icon="chevron-up"
            class="sidebar-icon"
          />
        </b-button>
        <b-button
          v-if="isTailing()"
          :pressed.sync="scrollEnabled"
          @click="blurActiveElement"
          v-b-tooltip.hover.left
          title="Toggle tailing"
          size="lg"
        >
          <font-awesome-icon
            icon="eye"
            class="sidebar-icon"
          />
        </b-button>
        <b-button
          :pressed.sync="showInjectedStages"
          @click="blurActiveElement"
          v-b-tooltip.hover.left
          title="Toggle injected stages"
          size="lg"
        >
          <font-awesome-icon
            icon="bolt"
            class="sidebar-icon"
          />
        </b-button>
        <b-button
          :pressed.sync="showTimestamps"
          @click="blurActiveElement"
          v-b-tooltip.hover.left
          title="Toggle timestamps"
          class="d-none d-xl-flex"
          size="lg"
        >
          <font-awesome-icon
            icon="stopwatch"
            class="sidebar-icon"
          />
        </b-button>
        <b-button
          :pressed.sync="showTruncatedLogs"
          @click="blurActiveElement"
          v-b-tooltip.hover.left
          title="Toggle truncated logs"
          size="lg"
        >
          <font-awesome-icon
            icon="expand-alt"
            class="sidebar-icon"
          />
        </b-button>
        <b-button
          @click="scrollDown"
          v-b-tooltip.hover.left
          title="Scroll down"
          size="lg"
        >
          <font-awesome-icon
            icon="chevron-down"
            class="sidebar-icon"
          />
        </b-button>
      </b-button-group>
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

import { BButton, BCard, BCardHeader, BCollapse, VBToggle, BButtonGroup } from 'bootstrap-vue'

import PropertyBlock from '@/components/PropertyBlock'
import StatusIcon from '@/components/StatusIcon'
import LogStageDetail from '@/components/LogStageDetail'
import LogStageIcons from '@/components/LogStageIcons'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faChevronUp, faChevronDown, faStopwatch, faExpandAlt, faBolt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEye, faChevronUp, faChevronDown, faStopwatch, faExpandAlt, faBolt)

export default {
  components: {
    BButton,
    BCard,
    BCardHeader,
    BCollapse,
    PropertyBlock,
    LogStageDetail,
    LogStageIcons,
    FontAwesomeIcon,
    BButtonGroup,
    StatusIcon
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
    },
    allowTail: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      steps: [],
      refresh: true,
      tailedSteps: [],
      showInjectedStages: false,
      showTimestamps: false,
      maxLinesToShow: 500,
      maxLinesToShowWhenTailing: 50,
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
    if (this.allowTail) {
      this.tailLogs()
    } else {
      this.loadLogs()
    }
  },

  methods: {
    loadLogs () {
      if (!this.allowTail || this.status === 'succeeded' || this.status === 'failed' || this.status === 'canceled') {
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
            this.periodicallyRefreshLogs(2)
          })
      } else {
        this.periodicallyRefreshLogs(2)
      }
    },

    periodicallyRefreshLogs (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadLogs, timeoutWithJitter)
      }
    },

    isTailing () {
      return this.allowTail && (this.status === 'pending' || this.status === 'running' || this.status === 'canceling')
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

          const data = JSON.parse(event.data)

          let stageType = 'stage'
          if (data.type) {
            stageType = data.type
          }

          if ((!data.type && (!data.depth || data.depth === 0)) || (data.type && stageType === 'stage' && !data.parentStage)) {
            let stepIndex = this.tailedSteps.findIndex(s => s === data.step)
            let step = stepIndex > -1 ? this.steps[stepIndex] : null
            if (stepIndex === -1) {
              // create new step
              let initialStatus = 'RUNNING'
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
              let outerStep = this.steps[this.steps.length - 1]
              if (data.parentStage) {
                const stepIndex = this.tailedSteps.findIndex(s => s === data.parentStage)
                if (stepIndex > -1) {
                  outerStep = this.steps[stepIndex]
                }
              }

              let nestedStepIndex, nestedStep
              if (stageType === 'service') {
                nestedStepIndex = outerStep.services.findIndex(ns => ns.step === data.step)
                nestedStep = nestedStepIndex > -1 ? outerStep.services[nestedStepIndex] : null
                if (nestedStepIndex === -1) {
                  // create new nested service step
                  let initialStatus = 'RUNNING'
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
                  let initialStatus = 'RUNNING'
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
      { maxWait: 5000 }
    ),

    scrollUp (event) {
      this.blurActiveElement()
      this.scrollEnabled = false
      window.scrollTo(0, 0)
    },

    scrollDown (event) {
      this.blurActiveElement()
      this.scrollEnabled = false
      window.scrollTo(0, document.body.scrollHeight)
    },

    blurActiveElement () {
      if ('activeElement' in document) {
        document.activeElement.blur()
      }
    }
  },

  watch: {
    '$route' (to, from) {
      if (this.es) {
        this.es.close()
      }
      this.steps = []
      this.tailedSteps = []
      if (this.allowTail) {
        this.tailLogs()
      } else {
        this.loadLogs()
      }
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
</style>
