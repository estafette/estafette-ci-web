<template>
  <div class="accordion m-3" id="pipelineStepsAccordion">

    <!--{{#if log}}-->

    <div class="card mb-3">
      <div class="card-header">
          <div class="row text-center">
            <div class="col-1">
              <strong>Status</strong>
            </div>
            <div class="col">
              <strong>Step</strong>
            </div>
            <div class="col-2">
              <strong>Image</strong>
            </div>
            <div class="col-1 text-right d-none d-xl-flex">
              <strong>Image size</strong>
            </div>
            <div class="col-1 text-right d-none d-xl-flex">
              <strong>Pull time</strong>
            </div>
            <div class="col-1 text-right d-none d-xl-flex">
              <strong>Execution time</strong>
            </div>
            <div class="col-1 text-right">
              <strong>Total time</strong>
            </div>
          </div>
      </div>
  </div>

  <div role="tablist">
    <b-card no-body v-for="(step, index) in log.steps" v-bind:key="index">
      <b-card-header class="clickable" v-b-toggle="'accordion'+index" role="tab">
        <div class="row">
          <div class="col-1 text-center">
            <span class="badge" :class="step.status | bootstrapClass('badge')">{{step.status}}</span>
          </div>
          <div class="col">
            <h4>
              {{step.step}}
            <small v-if="step.autoInjected" class="text-muted" title="This step is automatically injected by Estafette CI">(injected)</small>
            </h4>
          </div>
          <div class="col-2">
            {{step.image.name}}:{{step.image.tag}}
          </div>
          <div class="col-1 text-right d-none d-xl-flex">
            <span v-if="step.status == 'SUCCEEDED' || step.status == 'FAILED'">
              <span v-if="step.image.imageSize">{{step.image.imageSize | formatBytes}}</span>
              <em v-else class="text-muted">(cached)</em>
            </span>
          </div>
          <div class="col-1 text-right d-none d-xl-flex">
            <span v-if="step.status == 'SUCCEEDED' || step.status == 'FAILED'">
              <span v-if="step.image.imageSize">{{step.image.pullDuration | formatDuration}}</span>
              <em v-else class="text-muted">(cached)</em>
            </span>
          </div>
          <div class="col-1 text-right d-none d-xl-flex">
            {{step.duration | formatDuration}}
          </div>
          <div class="col-1 text-right">
            {{step.image.pullDuration + step.duration | formatDuration}}
          </div>
        </div>
      </b-card-header>
      <b-collapse :id="'accordion'+index" :visible="step.status === 'FAILED'" accordion="log-steps-accordion" role="tabpanel">
        <b-card-body class="text-monospace bg-dark text-light">
          <div class="row no-gutters" v-for="(line, index) in step.logLines" v-bind:key="index">
            <div class="col-1 text-white-50" style="min-width: 300px;">{{line.timestamp}}</div>
            <div class="col">{{line.text}}</div>
          </div>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>

  <div class="card mt-3">
    <div class="card-header">
        <div class="row text-center">
          <div class="col-1 text-center">
            <span class="badge" :class="totalStatus | bootstrapClass('badge')">{{totalStatus}}</span>
          </div>
          <div class="col">
          </div>
          <div class="col-1 text-right d-none d-xl-flex">
            <strong>{{totalImageSize | formatBytes}}</strong>
          </div>
          <div class="col-1 text-right d-none d-xl-flex">
            <strong>{{totalPullDuration | formatDuration}}</strong>
          </div>
          <div class="col-1 text-right d-none d-xl-flex">
            <strong>{{totalDuration | formatDuration}}</strong>
          </div>
          <div class="col-1 text-right">
            <strong>{{log.totalPullDuration + log.totalDuration | formatDuration}}</strong>
          </div>
        </div>
    </div>
  </div>

  <!--
  {{else}}
  Sorry, no logs!
  {{/if}}
  -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    repoSource: String,
    repoOwner: String,
    repoName: String,
    repoRevision: String
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
        return 'SUCCEEDED'
      }, 'SUCCEEDED')
    }
  },

  created () {
    axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/builds/${this.repoRevision}/logs`)
      .then(response => {
        this.log = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
