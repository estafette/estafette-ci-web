<template>
  <div class="header-block">
    <div class="property-block-title">
      <property-label text="Pipeline" />
      <property-value>
        <repository-title :repo="pipeline" />
      </property-value>
    </div>
    <div class="property-block">
      <property-label text="Version" />
      <property-value>
        {{ pipeline.buildVersion }}
      </property-value>
    </div>
    <div class="property-block">
      <property-label text="Built at" />
      <property-value>
        {{ pipeline.insertedAt | formatDatetime }}
        <duration-label :duration="pipeline.duration" />
      </property-value>
    </div>
    <div class="property-block">
      <property-label text="Branch" />
      <property-value>
        {{ pipeline.repoBranch }}
      </property-value>
    </div>
    <div class="property-block">
      <property-label text="Commit(s)" />
      <property-value>
        <commits
          :commits="pipeline.commits"
          :limit="1"
        />
      </property-value>
    </div>
    <div
      v-if="hasReleases || hasLabels || hasTriggers"
      class="block-divider"
    >
      <div />
    </div>
    <div
      v-if="hasTriggers"
      class="property-block-wide"
    >
      <property-label text="Triggered by" />
      <property-value>
        <triggered-by :events="pipeline.triggerEvents" />
      </property-value>
    </div>
    <div
      v-if="hasLabels"
      class="property-block-wide"
    >
      <property-label text="Labels" />
      <property-value>
        <labels :labels="pipeline.labels" />
      </property-value>
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
  </div>
</template>

<script>
import ReleaseBadge from '@/components/ReleaseBadge'
import TriggeredBy from '@/components/TriggeredBy'
import PropertyLabel from '@/components/PropertyLabel'
import PropertyValue from '@/components/PropertyValue'
import RepositoryTitle from '@/components/RepositoryTitle'
import DurationLabel from '@/components/DurationLabel'
import Commits from '@/components/Commits'
import Labels from '@/components/Labels'

export default {
  components: {
    ReleaseBadge,
    TriggeredBy,
    PropertyLabel,
    PropertyValue,
    RepositoryTitle,
    DurationLabel,
    Commits,
    Labels
  },

  props: {
    pipeline: {
      type: Object,
      default: null
    },
    filter: {
      type: Object,
      default: null
    }
  },

  computed: {
    hasReleases () {
      return this.pipeline.releaseTargets && this.pipeline.releaseTargets.length > 0
    },

    hasLabels () {
      return this.pipeline.labels && this.pipeline.labels.length > 0
    },

    hasTriggers () {
      return this.pipeline.triggerEvents && this.pipeline.triggerEvents.length > 0
    }
  }
}
</script>
