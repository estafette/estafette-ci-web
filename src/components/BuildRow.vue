<template>
  <router-link
    :to="{ name: 'PipelineBuildLogs', params: { repoSource: build.repoSource, repoOwner: build.repoOwner, repoName: build.repoName, id: build.id }}"
    tag="div"
    class="row-block"
  >
    <property-block
      label="Version"
      :value="build.buildVersion"
      class="col-xxxl-2"
    />
    <property-block
      label="Status"
      class="col-xxxl-1"
    >
      <b-progress
        :value="100"
        :variant="$options.filters.bootstrapVariant(build.buildStatus)"
        :animated="$options.filters.animatedProgressBar(build.buildStatus)"
      />
    </property-block>
    <property-block
      label="Built at"
      class="col-xxxl-2"
    >
      {{ build.insertedAt | formatDatetime }}
      <duration-label :duration="build.duration" />
    </property-block>
    <property-block
      label="Branch"
      :value="build.repoBranch"
      class="col-xxxl-1"
    />
    <property-block
      label="Revision"
      class="col-xxxl-1"
    >
      <commit-link :build="build" />
    </property-block>
    <property-block
      label="Commit(s)"
      class="col-xxxl-3"
    >
      <commits :commits="build.commits" />
    </property-block>
    <property-block
      v-if="showActions"
      label="Actions"
      no-truncate
      class="col-xxxl-2"
    >
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
    </property-block>
    <div
      v-if="showReleases"
      class="block-divider"
    >
      <div />
    </div>
    <property-block
      v-if="showReleases"
      label="Releases"
      wide
    >
      <release-badge-for-build
        v-for="releaseTarget in pipeline.releaseTargets"
        :key="releaseTarget.name"
        :release-target="releaseTarget"
        :build="build"
      />
    </property-block>
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
import PropertyBlock from '@/components/PropertyBlock'
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
    PropertyBlock,
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
