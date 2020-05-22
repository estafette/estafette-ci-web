<template>
  <div class="header-block">
    <property-block
      label="Release"
      variant="primary"
      title
    >
      <repository-title :repo="release" />
    </property-block>
    <property-block :label="release.action ? 'Target + action' : 'Target'">
      {{ release.name }}<span v-if="release.action">
        / {{ release.action }}
      </span>
    </property-block>
    <property-block
      label="Version"
      :value="release.releaseVersion"
    />
    <property-block label="Status">
      <b-progress
        :value="100"
        :variant="$options.filters.bootstrapVariant(release.releaseStatus)"
        :animated="$options.filters.animatedProgressBar(release.releaseStatus)"
      />
    </property-block>
    <property-block label="Released at">
      {{ release.insertedAt | formatDatetime }}
      <duration-label :duration="release.duration" />
    </property-block>
    <property-block label="Triggered by">
      <triggered-by :events="release.triggerEvents" />
    </property-block>
    <property-block
      v-if="showActions"
      label="Actions"
    >
      <cancel-button :release="release" />
    </property-block>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BProgress } from 'bootstrap-vue'
import CancelButton from '@/components/CancelButton'
import TriggeredBy from '@/components/TriggeredBy'
import PropertyBlock from '@/components/PropertyBlock'
import RepositoryTitle from '@/components/RepositoryTitle'
import DurationLabel from '@/components/DurationLabel'

export default {
  components: {
    BProgress,
    CancelButton,
    TriggeredBy,
    PropertyBlock,
    RepositoryTitle,
    DurationLabel
  },

  props: {
    release: {
      type: Object,
      default: null
    }
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    }),

    showActions () {
      return this.user && this.user.authenticated && this.release && (this.release.releaseStatus === 'pending' || this.release.releaseStatus === 'running' || this.release.releaseStatus === 'canceling')
    }
  }
}
</script>