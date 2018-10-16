<template>
  <div v-if="log && log.steps" class="accordion m-3">

    <div class="row rounded border pt-3 pr-2 pb-2 pl-2 mt-2 mr-0 mb-2 ml-0 font-weight-bold">
      <div class="col-4 col-md-2 col-xl-1 text-center">Status</div>
      <div class="col-8 col-lg-5 col-xl-4">Stage</div>
      <div class="col-4 col-xl-3 d-none d-lg-flex">Image</div>
      <div class="col-1 text-right d-none d-xl-flex">Image size</div>
      <div class="col-1 text-right d-none d-xl-flex">Pull time</div>
      <div class="col-1 text-right d-none d-xl-flex">Execution time</div>
      <div class="col-2 col-lg-1 text-right d-none d-md-flex">Total time</div>
    </div>

    <div role="tablist">
      <b-card no-body v-for="(step, index) in log.steps" v-bind:key="index" class="rounded border mt-2 mr-0 mb-2 ml-0 p-0" :class="step.status | bootstrapClass('border')">
        <b-card-header class="row m-0 pt-3 pr-2 pb-3 pl-2 clickable border-0 rounded-0" v-b-toggle="'accordion'+index" role="tab">
          <div class="col-4 col-md-2 col-xl-1 text-center">
            <span class="badge mt-2" :class="step.status | bootstrapClass('badge')">{{step.status}}</span>
          </div>
          <div class="col-8 col-lg-5 col-xl-4 text-truncate h4" :title="step.step">
            {{step.step}}
            <span v-if="step.autoInjected" class="small text-muted" title="This step is automatically injected by Estafette CI">(injected)</span>
          </div>
          <div class="col-4 col-xl-3 d-none d-lg-flex text-truncate">
            <span v-if="step.image">
              {{step.image.name}}:{{step.image.tag}}
            </span>
          </div>
          <div class="col-1 text-right d-none d-xl-flex">
            <span v-if="step.image && (step.status == 'RUNNING' || step.status == 'SUCCEEDED' || step.status == 'FAILED')">
              <span v-if="step.image && step.image.imageSize">{{step.image.imageSize | formatBytes}}</span>
              <em v-else class="text-muted">(cached)</em>
            </span>
          </div>
          <div class="col-1 text-right d-none d-xl-flex">
            <span v-if="step.image && (step.status == 'RUNNING' || step.status == 'SUCCEEDED' || step.status == 'FAILED')">
              <span v-if="step.image.imageSize">{{step.image.pullDuration | formatDuration}}</span>
              <em v-else class="text-muted">(cached)</em>
            </span>
          </div>
          <div class="col-1 text-right d-none d-xl-flex">
            <span v-if="step.duration && (step.status == 'SUCCEEDED' || step.status == 'FAILED')">
              {{step.duration | formatDuration}}
            </span>
          </div>
          <div class="col-2 col-lg-1 text-right d-none d-md-flex">
            <span v-if="step.image && (step.status == 'RUNNING' || step.status == 'SUCCEEDED' || step.status == 'FAILED')">
              {{step.image.pullDuration + step.duration | formatDuration}}
            </span>
          </div>
        </b-card-header>

        <b-collapse class="row collapse bg-dark m-0 p-3" :id="'accordion'+index" :visible="step.status === 'RUNNING' || step.status === 'FAILED'" accordion="log-steps-accordion" role="tabpanel">
          <div class="container-fluid">
            <div class="row no-gutters" v-for="(line, index) in step.logLines" v-bind:key="index">
              <pre class="col-1 text-white-50 d-none d-xl-flex" style="min-width: 300px;">{{line.timestamp}}</pre>
              <pre class="col text-light">{{line.text}}</pre>
            </div>
          </div>
        </b-collapse>
      </b-card>
    </div>

    <div class="row rounded border mt-2 mr-0 mb-2 ml-0 pt-3 pr-2 pb-3 pl-2 font-weight-bold" :class="totalStatus | bootstrapClass('border')">
      <div class="col-4 col-md-2 col-xl-1 text-center">
        <span class="badge" :class="totalStatus | bootstrapClass('badge')">{{totalStatus}}</span>
      </div>
      <div class="col-8 col-lg-5 col-xl-4">
      </div>
      <div class="col-4 col-xl-3 d-none d-lg-flex">
      </div>
      <div class="col-1 text-right d-none d-xl-flex">
        {{totalImageSize | formatBytes}}
      </div>
      <div class="col-1 text-right d-none d-xl-flex">
        {{totalPullDuration | formatDuration}}
      </div>
      <div class="col-1 text-right d-none d-xl-flex">
        {{totalDuration | formatDuration}}
      </div>
      <div class="col-2 col-lg-1 text-right d-none d-md-flex">
        {{totalPullDuration + totalDuration | formatDuration}}
      </div>
    </div>
  </div>
  <div v-else class="m-3">Hold on, we're waiting for the logs to come in!</div>
</template>

<script>
export default {
  props: {
    repoSource: String,
    repoOwner: String,
    repoName: String,
    releaseID: String,
    release: Object
  },
  data: function () {
    return {
      log: {},
      errors: []
    }
  },

  computed: {
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
    this.loadLogs()
  },

  methods: {
    loadLogs () {
      if (this.release.releaseStatus === 'succeeded' || this.release.releaseStatus === 'failed') {
        this.axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/releases/${this.releaseID}/logs`)
          .then(response => {
            this.log = response.data
          })
          .catch(e => {
            this.errors.push(e)
            this.periodicallyRefreshLogs(15)
          })
      } else {
        this.periodicallyRefreshLogs(3)
      }
    },

    periodicallyRefreshLogs (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      this.refreshTimeout = setTimeout(this.loadLogs, timeoutWithJitter)
    },

    tailLogs () {
      if (this.release.releaseStatus === 'running') {
        let es = new EventSource(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/releases/${this.releaseID}/logs/tail`)

        es.addEventListener('log', event => {
          let data = JSON.parse(event.data)

          if (!this.log) {
            this.log = {}
          }
          if (!this.log.steps) {
            this.$set(this.log, 'steps', [])
          }

          var step = this.log.steps.find(s => s.step === data.step)
          if (!step) {
            // set all previous steps to SUCCEEDED so they close
            this.log.steps.forEach(s => {
              s.status = 'SUCCEEDED'
            })

            // create new step
            if (data.image) {
              step = {step: data.step, image: data.image, logLines: [], exitCode: 0, status: 'RUNNING', autoInjected: data.autoInjected ? data.autoInjected : false, duration: 0}
            } else {
              step = {step: data.step, logLines: [], exitCode: 0, status: 'RUNNING', autoInjected: false, duration: 0}
            }
            this.log.steps.push(step)
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
            step.logLines.push(data.logLine)
          }

          window.scrollTo(0, document.body.scrollHeight)
        }, false)

        es.addEventListener('close', event => {
          es.close()
          this.loadLogs()
        }, false)
      }
    }
  },

  beforeDestroy () {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
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

pre {
  font-size: inherit;
  margin: 0;
}
</style>
