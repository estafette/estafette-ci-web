<template>
  <router-link
    :to="{ name: 'PipelineOverview', params: { repoSource: pipeline.repoSource, repoOwner: pipeline.repoOwner, repoName: pipeline.repoName }}"
    tag="div"
    class="row-block"
  >
    <div class="property-block col-xxxl-3">
      <property-label text="Pipeline" />
      <property-value>
        <repository-title :repo="pipeline" />
      </property-value>
    </div>
    <div class="property-block col-xxxl-1">
      <property-label text="Version" />
      <property-value>
        {{ pipeline.buildVersion }}
      </property-value>
    </div>
    <div class="property-block col-xxxl-1">
      <property-label text="Status" />
      <property-value>
        <router-link :to="{ name: 'PipelineBuildLogs', params: { repoSource: pipeline.repoSource, repoOwner: pipeline.repoOwner, repoName: pipeline.repoName, id: pipeline.id }}">
          <b-progress
            :value="100"
            :variant="$options.filters.bootstrapVariant(pipeline.buildStatus)"
            :animated="$options.filters.animatedProgressBar(pipeline.buildStatus)"
          />
        </router-link>
      </property-value>
    </div>
    <div class="property-block col-xxxl-2">
      <property-label text="Built at" />
      <property-value>
        {{ pipeline.insertedAt | formatDatetime }}
        <duration-label :duration="pipeline.duration" />
      </property-value>
    </div>
    <div class="property-block col-xxxl-1">
      <property-label text="Branch" />
      <property-value>
        {{ pipeline.repoBranch }}
      </property-value>
    </div>
    <div class="property-block col-xxxl-1">
      <property-label text="Revision" />
      <property-value>
        <commit-link :build="pipeline" />
      </property-value>
    </div>
    <div class="property-block col-xxxl-3">
      <property-label text="Commit(s)" />
      <property-value>
        <commits
          :commits="pipeline.commits"
          :limit="1"
        />
      </property-value>
    </div>
    <div
      v-if="hasReleases"
      class="block-divider"
    >
      <div />
    </div>
    <div
      v-if="hasReleases"
      class="property-block-wide"
    >
      <property-label text="Releases" />
      <property-value>
        <release-badge
          v-for="releaseTarget in pipeline.releaseTargets"
          :key="releaseTarget.name"
          :release-target="releaseTarget"
          :pipeline="pipeline"
        />
      </property-value>
    </div>
  </router-link>
</template>

<script>
import { BProgress } from 'bootstrap-vue'
import CommitLink from '@/components/CommitLink'
import ReleaseBadge from '@/components/ReleaseBadge'
import PropertyLabel from '@/components/PropertyLabel'
import PropertyValue from '@/components/PropertyValue'
import RepositoryTitle from '@/components/RepositoryTitle'
import DurationLabel from '@/components/DurationLabel'
import Commits from '@/components/Commits'

export default {
  components: {
    BProgress,
    CommitLink,
    ReleaseBadge,
    PropertyLabel,
    PropertyValue,
    RepositoryTitle,
    DurationLabel,
    Commits
  },

  props: {
    pipeline: {
      type: Object,
      default: null
    }
  },

  computed: {
    hasReleases () {
      return this.pipeline.releaseTargets && this.pipeline.releaseTargets.length > 0
    }
  }
}
</script>
