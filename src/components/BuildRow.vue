<template>
  <router-link
    :to="{ name: 'PipelineBuildLogs', params: { repoSource: build.repoSource, repoOwner: build.repoOwner, repoName: build.repoName, id: build.id }}"
    tag="div"
    class="row-block"
  >
    <div class="property-block col-xxxl-2">
      <property-label text="Version" />
      <property-value>
        {{ build.buildVersion }}
      </property-value>
    </div>
    <div class="property-block col-xxxl-1">
      <property-label text="Status" />
      <property-value>
        <b-progress
          :value="100"
          :variant="$options.filters.bootstrapVariant(build.buildStatus)"
          :animated="$options.filters.animatedProgressBar(build.buildStatus)"
        />
      </property-value>
    </div>
    <div class="property-block col-xxxl-2">
      <property-label text="Built at" />
      <property-value>
        {{ build.insertedAt | formatDatetime }}
        <duration-label :duration="build.duration" />
      </property-value>
    </div>
    <div class="property-block col-xxxl-1">
      <property-label text="Branch" />
      <property-value>
        {{ build.repoBranch }}
      </property-value>
    </div>
    <div class="property-block col-xxxl-1">
      <property-label text="Revision" />
      <property-value>
        <commit-link :build="build" />
      </property-value>
    </div>
    <div class="property-block col-xxxl-3">
      <property-label text="Commit(s)" />
      <property-value>
        <commits :commits="build.commits" />
      </property-value>
    </div>
    <div
      v-if="showActions"
      class="property-block col-xxxl-2"
    >
      <property-label text="Actions" />
      <property-value>
        <release-button
          :pipeline="pipeline"
          :build="build"
        />
        <rebuild-button
          :build="build"
          :builds="builds"
        />
        <cancel-button
          :build="build"
        />
      </property-value>
    </div>
    <div
      v-if="showReleases"
      class="block-divider"
    >
      <div />
    </div>
    <div
      v-if="showReleases"
      class="property-block-wide"
    >
      <property-label text="Releases" />
      <property-value>
        <release-badge-for-build
          v-for="releaseTarget in pipeline.releaseTargets"
          :key="releaseTarget.name"
          :release-target="releaseTarget"
          :build="build"
        />
      </property-value>
    </div>
  </router-link>
</template>

<script>
import { mapState } from 'vuex'
import { BProgress } from 'bootstrap-vue'
import CommitLink from '@/components/CommitLink'
import ReleaseButton from '@/components/ReleaseButton'
import RebuildButton from '@/components/RebuildButton'
import CancelButton from '@/components/CancelButton'
import ReleaseBadgeForBuild from '@/components/ReleaseBadgeForBuild'
import PropertyLabel from '@/components/PropertyLabel'
import PropertyValue from '@/components/PropertyValue'
import DurationLabel from '@/components/DurationLabel'
import Commits from '@/components/Commits'

export default {
  components: {
    BProgress,
    CommitLink,
    ReleaseButton,
    RebuildButton,
    CancelButton,
    ReleaseBadgeForBuild,
    PropertyLabel,
    PropertyValue,
    DurationLabel,
    Commits
  },

  props: {
    build: {
      type: Object,
      default: null
    },
    builds: {
      type: Array,
      default: null
    },
    pipeline: {
      type: Object,
      default: null
    }
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    }),

    showReleases () {
      if (this.pipeline && this.pipeline.releaseTargets && this.pipeline.releaseTargets.length > 0) {
        return this.pipeline.releaseTargets.some(r => r.activeReleases && r.activeReleases.some(ar => ar.releaseVersion === this.build.buildVersion))
      }
      return false
    },

    showActions () {
      return this.user && this.user.authenticated && this.build && ((this.build.buildStatus === 'failed' || this.build.buildStatus === 'pending' || this.build.buildStatus === 'running' || this.build.buildStatus === 'canceled' || this.build.buildStatus === 'canceling') || (this.pipeline.releaseTargets && this.pipeline.releaseTargets.length > 0 && this.build.buildStatus === 'succeeded'))
    }
  }
}
</script>
