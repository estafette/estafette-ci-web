<template>
  <div v-if="events && events.length > 0">
    <div
      v-for="(event, i) in events"
      :key="i"
    >
      <div
        v-if="event.pipeline"
        :title="event.pipeline.repoSource + ' / ' + event.pipeline.repoOwner + ' / ' + event.pipeline.repoName"
      >
        <font-awesome-icon
          icon="tools"
          class="triggered-by-icon"
        />
        <router-link
          :to="{ name: 'PipelineOverview', params: { repoSource: event.pipeline.repoSource, repoOwner: event.pipeline.repoOwner, repoName: event.pipeline.repoName }}"
          class="text-body"
        >
          {{ event.pipeline.repoSource }}/{{ event.pipeline.repoOwner }}/{{ event.pipeline.repoName }}
        </router-link>
        <!-- {{ event.pipeline.buildVersion }}
        {{ event.pipeline.repoBranch }}
        {{ event.pipeline.status }}
        {{ event.pipeline.event }} -->
      </div>
      <div
        v-if="event.release"
        :title="event.release.repoSource + ' / ' + event.release.repoOwner + ' / ' + event.release.repoName"
      >
        <font-awesome-icon
          icon="upload"
          class="triggered-by-icon"
        />
        <router-link
          :to="{ name: 'PipelineReleases', params: { repoSource: event.release.repoSource, repoOwner: event.release.repoOwner, repoName: event.release.repoName }}"
          class="text-body"
        >
          {{ event.release.repoSource }}/{{ event.release.repoOwner }}/{{ event.release.repoName }}
        </router-link>
        <!-- {{ event.release.releaseVersion }}
        {{ event.release.target }}
        {{ event.release.status }}
        {{ event.release.event }} -->
      </div>
      <div
        v-if="event.git"
        :title="event.git.repository"
      >
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
        <!-- {{ event.git.branch }} -->
      </div>
      <div
        v-if="event.github"
        :title="event.github.repository"
      >
        <font-awesome-icon
          :icon="['fab', 'github']"
          class="triggered-by-icon"
        />
        <!-- <a
          :href="'https://'+event.github.repository"
          target="_blank"
          class="text-body"
          @click.stop
        >
          {{ event.github.repository }}
        </a> -->
        {{ event.github.event }}
      </div>
      <div
        v-if="event.bitbucket"
        :title="event.bitbucket.repository"
      >
        <font-awesome-icon
          :icon="['fab', 'bitbucket']"
          class="triggered-by-icon"
        />
        <!-- <a
          :href="'https://'+event.bitbucket.repository"
          target="_blank"
          class="text-body"
          @click.stop
        >
          {{ event.bitbucket.repository }}
        </a> -->
        {{ event.bitbucket.event }}
      </div>
      <div
        v-if="event.pubsub"
        :title="'projects/'+event.pubsub.project+'/topics/'+event.pubsub.topic"
      >
        <h6>
          <font-awesome-icon
            icon="bezier-curve"
            class="triggered-by-icon"
          />
          projects/{{ event.pubsub.project }}/topics/{{ event.pubsub.topic }}
        </h6>
      </div>
      <div v-if="event.docker" />
      <div
        v-if="event.cron"
        :title="event.cron.time"
      >
        <font-awesome-icon
          icon="clock"
          class="triggered-by-icon"
        />
        {{ event.cron.time }}
      </div>
      <div
        v-if="event.manual"
        :title="event.manual.userID"
      >
        <font-awesome-icon
          icon="user-circle"
          class="triggered-by-icon"
        />
        {{ event.manual.userID }}
      </div>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTools, faUpload, faUserCircle, faClock, faCodeBranch, faBezierCurve } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faBitbucket } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTools, faUpload, faUserCircle, faClock, faCodeBranch, faBezierCurve, faGithub, faBitbucket)

export default {
  components: {
    FontAwesomeIcon
  },

  props: {
    events: {
      type: Array,
      default: null
    }
  }
}
</script>
