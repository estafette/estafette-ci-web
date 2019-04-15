<template>
  <div class="m-3">
    <div
      class="h2 text-center text-white mt-5 mb-5"
      v-if="dashboardModeActive"
    >
      <font-awesome-icon
        icon="chart-line"
        class="mr-2"
      />
      Triggers
    </div>

    <div
      v-if="pipeline && pipeline.triggers && pipeline.triggers.length > 0"
      class="container-fluid text-center p-5"
    >
      <div class="row d-flex justify-content-center">
        <div
          :class="[
            dashboardModeActive ? 'bg-warning' : '',
            'rounded border border-warning m-3 p-4 d-inline-flex align-items-center'
          ]"
        >
          <div>
            <h6>
              <font-awesome-icon
                icon="code-branch"
                class="triggered-by-icon"
              />
              <a
                :href="'https://'+pipeline.repoSource+'/'+pipeline.repoOwner+'/'+pipeline.repoName"
                target="_blank"
                class="text-body"
                @click.stop
              >
                {{ pipeline.repoSource }}/{{ pipeline.repoOwner }}/{{ pipeline.repoName }}
              </a>
            </h6>
            <span class="btn btn-light btn-sm mr-1">
              event
              <span class="badge badge-secondary">
                push
              </span>
            </span>
            <span class="btn btn-light btn-sm mr-1">
              injected
            </span>
          </div>
        </div>
        <div
          v-for="(trigger, i) in pipeline.triggers"
          :key="i"
          :class="[
            dashboardModeActive ? 'bg-warning' : '',
            'rounded border border-warning m-3 p-4 d-inline-flex align-items-center'
          ]"
        >
          <div v-if="trigger.pipeline">
            <h6>
              <font-awesome-icon
                icon="tools"
                class="triggered-by-icon"
              />
              {{ trigger.pipeline.name }}
            </h6>
            <span class="btn btn-light btn-sm mr-1">
              branch
              <span class="badge badge-secondary">
                {{ trigger.pipeline.branch }}
              </span>
            </span>
            <span class="btn btn-light btn-sm mr-1">
              event
              <span class="badge badge-secondary">
                {{ trigger.pipeline.event }}
              </span>
            </span>
            <span class="btn btn-light btn-sm mr-1">
              status
              <span class="badge badge-secondary">
                {{ trigger.pipeline.status }}
              </span>
            </span>
          </div>
          <div v-if="trigger.release">
            <h6>
              <font-awesome-icon
                icon="upload"
                class="triggered-by-icon"
              />
              {{ trigger.release.name }}
            </h6>
            <span class="btn btn-light btn-sm mr-1">
              target
              <span class="badge badge-secondary">
                {{ trigger.release.target }}
              </span>
            </span>
            <span class="btn btn-light btn-sm mr-1">
              event
              <span class="badge badge-secondary">
                {{ trigger.release.event }}
              </span>
            </span>
            <span class="btn btn-light btn-sm mr-1">
              status
              <span class="badge badge-secondary">
                {{ trigger.release.status }}
              </span>
            </span>
          </div>
          <div v-if="trigger.git">
            <h6>
              <font-awesome-icon
                icon="code-branch"
                class="triggered-by-icon"
              />
              <a
                :href="'https://'+event.git.repository"
                target="_blank"
                class="text-body"
                @click.stop
              >
                {{ event.git.repository }}
              </a>
            </h6>
          </div>
          <div v-if="trigger.docker" />
          <div v-if="trigger.cron">
            <h6>
              <font-awesome-icon
                icon="clock"
                class="triggered-by-icon"
              />
              {{ trigger.cron.schedule }}
            </h6>
          </div>
        </div>
      </div>

      <div class="row d-flex justify-content-center">
        <div
          :class="[
            dashboardModeActive ? 'bg-primary text-white' : '',
            'rounded border border-primary m-3 p-4 d-inline-flex align-items-center'
          ]"
        >
          <div>
            <h6>
              <font-awesome-icon
                icon="industry"
                class="triggered-by-icon"
              />
              {{ pipeline.repoSource }}/{{ pipeline.repoOwner }}/{{ pipeline.repoName }}
            </h6>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="alert alert-warning text-center p-5"
    >
      This pipeline has no triggers; if you want the pipeline to trigger on other events than a git push look at the <a
        href="https://estafette.io/usage/manifest/#triggers"
        target="_blank"
      >
        documentation
      </a> on how to start using triggers.
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faProjectDiagram, faTools, faUpload, faUserCircle, faClock, faCodeBranch, faIndustry } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faProjectDiagram, faTools, faUpload, faUserCircle, faClock, faCodeBranch, faIndustry)

export default {
  components: {
    FontAwesomeIcon
  },

  props: {
    pipeline: {
      type: Object,
      default: null
    },
    dashboardModeActive: {
      type: Boolean,
      default: null
    }
  }
}
</script>
