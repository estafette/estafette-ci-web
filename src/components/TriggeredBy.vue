<template>
  <div v-if="events && events.length > 0">
    <div
      v-for="(event, i) in events"
      :key="i"
    >
      <div v-if="event.pipeline">
        <font-awesome-icon
          icon="tools"
          class="triggered-by-icon"
        />
        <router-link :to="{ name: 'PipelineBuilds', params: { repoSource: event.pipeline.repoSource, repoOwner: event.pipeline.repoOwner, repoName: event.pipeline.repoName }}">
          {{ event.pipeline.repoSource }}/{{ event.pipeline.repoOwner }}/{{ event.pipeline.repoName }}
        </router-link>
        <!-- {{ event.pipeline.buildVersion }}
        {{ event.pipeline.repoBranch }}
        {{ event.pipeline.status }}
        {{ event.pipeline.event }} -->
      </div>
      <div v-if="event.release">
        <font-awesome-icon
          icon="upload"
          class="triggered-by-icon"
        />
        <router-link :to="{ name: 'PipelineReleases', params: { repoSource: event.release.repoSource, repoOwner: event.release.repoOwner, repoName: event.release.repoName }}">
          {{ event.release.repoSource }}/{{ event.release.repoOwner }}/{{ event.release.repoName }}
        </router-link>
        <!-- {{ event.release.releaseVersion }}
        {{ event.release.target }}
        {{ event.release.status }}
        {{ event.release.event }} -->
      </div>
      <div v-if="event.git">
        <font-awesome-icon
          icon="code-branch"
          class="triggered-by-icon"
        />
        {{ event.git.repository }}
        <!-- {{ event.git.branch }} -->
      </div>
      <div v-if="event.docker" />
      <div v-if="event.cron">
        <font-awesome-icon
          icon="clock"
          class="triggered-by-icon"
        />
        {{ event.cron.time }}
      </div>
      <div v-if="event.manual">
        <font-awesome-icon
          icon="user-circle"
          class="triggered-by-icon"
        />
        {{ event.manual.userID }}
      </div>
    </div>
  </div>
  <div v-else>
    {{ triggeredBy }}
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTools, faUpload, faUserCircle, faClock, faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTools, faUpload, faUserCircle, faClock, faCodeBranch)

export default {
  components: {
    FontAwesomeIcon
  },

  props: {
    events: {
      type: Array,
      default: null
    },
    triggeredBy: {
      type: String,
      default: null
    }
  }
}
</script>
