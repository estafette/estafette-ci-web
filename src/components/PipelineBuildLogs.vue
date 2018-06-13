<template>
  <div class="accordion m-3" id="accordionExample">

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

  <div class="card" v-for="(step, index) in log.steps" v-bind:key="index">
    <div class="card-header clickable" :id="'heading-'+index" data-toggle="collapse" :data-target="'#collapse-'+index" :aria-expanded="step.status === 'failed'" :aria-controls="'collapse-'+index">
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
            <!--{{step.image.name}}:{{step.image.tag}}-->
          </div>
          <div class="col-1 text-right d-none d-xl-flex">
          <!--
            {{#if (is-step-executed step.status)}}
              {{#if step.image.imageSize}}
              {{pretty-print-bytes step.image.imageSize}}
              {{else}}
              <em class="text-muted">(cached)</em>
              {{/if}}
            {{/if}}
            -->
          </div>
          <div class="col-1 text-right d-none d-xl-flex">
          <!--
            {{#if (is-step-executed step.status)}}
              {{#if step.image.imageSize}}
              {{pretty-print-timespan step.image.pullDuration}}
              {{else}}
              <em class="text-muted">(cached)</em>
              {{/if}}
            {{/if}}
            -->
          </div>
          <div class="col-1 text-right d-none d-xl-flex">
            {{step.duration}}
          </div>
          <div class="col-1 text-right">
          <!--
            {{step.image.pullDuration step.duration}}
            -->
          </div>
        </div>
    </div>
    <div :id="'collapse-'+index" class="collapse" :class="{show: step.status === 'FAILED'}" :aria-labelledby="'heading-'+index" data-parent="#accordionExample">
      <div class="card-body text-monospace bg-dark text-light">
        <div class="row no-gutters" v-for="(line, index) in step.logLines" v-bind:key="index">
          <div class="col-1 text-white-50" style="min-width: 300px;">{{line.timestamp}}</div>
          <div class="col">{{line.text}}</div>
        </div>
      </div>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
        <div class="row text-center">
          <div class="col-1 text-center">
            <span class="badge" :class="log.totalStatus | bootstrapClass('badge')">{{log.totalStatus}}</span>
          </div>
          <div class="col">
          </div>
          <div class="col-1 text-right d-none d-xl-flex">
            <strong>{{log.totalImageSize}}</strong>
          </div>
          <div class="col-1 text-right d-none d-xl-flex">
            <strong>{{log.totalPullDuration}}</strong>
          </div>
          <div class="col-1 text-right d-none d-xl-flex">
            <strong>{{log.totalDuration}}</strong>
          </div>
          <div class="col-1 text-right">
          <!--
            <strong>{{log.totalPullDuration log.totalDuration}}</strong>
          -->
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
