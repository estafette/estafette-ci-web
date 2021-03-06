<template>
  <div class="m-3">
    <div
      class="container-fluid text-center p-5"
    >
      <div class="row d-flex justify-content-center">
        <div
          :class="[
            'rounded border border-warning m-3 p-4 d-inline-flex align-items-center trigger-block bg-white'
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
                {{ pipeline.repoSource }}/{{ pipeline.repoOwner }}/{{ pipeline.repoName }} *
              </a>
            </h6>
            <span class="btn btn-light btn-sm mr-1">
              event
              <span class="badge badge-warning">
                push
              </span>
            </span>
            <span class="btn btn-light btn-sm mr-1">
              branch
              <span class="badge badge-warning">
                any
              </span>
            </span>
          </div>
        </div>
        <div
          v-for="(trigger, i) in pipeline.triggers"
          :key="i"
          :class="[
            'rounded border border-warning m-3 p-4 d-inline-flex align-items-center trigger-block bg-white'
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
              <span class="badge badge-warning">
                {{ trigger.pipeline.branch }}
              </span>
            </span>
            <span class="btn btn-light btn-sm mr-1">
              event
              <span class="badge badge-warning">
                {{ trigger.pipeline.event }}
              </span>
            </span>
            <span class="btn btn-light btn-sm mr-1">
              status
              <span class="badge badge-warning">
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
              <span class="badge badge-warning">
                {{ trigger.release.target }}
              </span>
            </span>
            <span class="btn btn-light btn-sm mr-1">
              event
              <span class="badge badge-warning">
                {{ trigger.release.event }}
              </span>
            </span>
            <span class="btn btn-light btn-sm mr-1">
              status
              <span class="badge badge-warning">
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
                :href="'https://'+trigger.git.repository"
                target="_blank"
                class="text-body"
                @click.stop
              >
                {{ trigger.git.repository }}
              </a>
            </h6>
          </div>
          <div v-if="trigger.pubsub">
            <h6>
              <font-awesome-icon
                icon="bezier-curve"
                class="triggered-by-icon"
              />
              projects/{{ trigger.pubsub.project }}/topics/{{ trigger.pubsub.topic }}
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
            'rounded border border-primary m-3 p-5 d-inline-flex align-items-center pipeline-block bg-white'
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

      <div
        class="alert alert-light text-center m-5 p-4"
      >
        <div>
          * pipelines automatically trigger on git push; if you want to trigger on other events have a look at the <a
            href="https://estafette.io/usage/manifest/#triggers"
            target="_blank"
          >
            documentation
          </a> on how to start using triggers.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faProjectDiagram, faTools, faUpload, faUserCircle, faClock, faCodeBranch, faIndustry, faBezierCurve } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faProjectDiagram, faTools, faUpload, faUserCircle, faClock, faCodeBranch, faIndustry, faBezierCurve)

export default {
  components: {
    FontAwesomeIcon
  },

  props: {
    pipeline: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.trigger-block {
  border-style: dashed!important;
  border-width: 2px!important;
}
.pipeline-block {
  border-width: 2px!important;
}
</style>
