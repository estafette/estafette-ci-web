<template>
  <router-link
    :to="{ name: 'PipelineReleaseLogs', params: { repoSource: release.repoSource, repoOwner: release.repoOwner, repoName: release.repoName, releaseID: release.id }}"
    tag="div"
    class="row-block"
  >
    <property-block
      :label="release.action ? 'Target + action' : 'Target'"
      class="col-xxxl-2"
    >
      {{ release.name }}<span v-if="release.action">
        / {{ release.action }}
      </span>
    </property-block>
    <property-block
      label="Version"
      :value="release.releaseVersion"
      class="col-xxxl-2"
    />
    <property-block
      label="Status"
      class="col-xxxl-2"
    >
      <b-progress
        :value="100"
        :variant="$options.filters.bootstrapVariant(release.releaseStatus)"
        :animated="$options.filters.animatedProgressBar(release.releaseStatus)"
      />
    </property-block>
    <property-block
      label="Released at"
      class="col-xxxl-2"
    >
      {{ release.insertedAt | formatDatetime }}
      <duration-label :duration="release.duration" />
    </property-block>
    <property-block label="Triggered by">
      <triggered-by :events="release.triggerEvents" />
    </property-block>
    <property-block
      v-if="showActions"
      label="Actions"
      no-truncate
      class="col-xxxl-2"
    >
      <cancel-button :release="release" />
    </property-block>
  </router-link>
</template>

<script>
import { mapState } from 'vuex'
import { BProgress } from 'bootstrap-vue'
import CancelButton from '@/components/CancelButton'
import TriggeredBy from '@/components/TriggeredBy'
import PropertyBlock from '@/components/PropertyBlock'
import DurationLabel from '@/components/DurationLabel'

export default {
  components: {
    BProgress,
    CancelButton,
    TriggeredBy,
    PropertyBlock,
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
