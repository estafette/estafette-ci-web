<template>
  <router-link
    :to="{ name: 'PipelineReleaseLogs', params: { repoSource: release.repoSource, repoOwner: release.repoOwner, repoName: release.repoName, releaseID: release.id }}"
    tag="div"
    class="row-block list-complete-item"
  >
    <property-block
      v-if="allReleasesMode"
      label="Pipeline"
      class="col-xxxl-2"
    >
      <repository-title :repo="release" />
    </property-block>
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
      <b-progress>
        <b-progress-bar
          :value="$options.filters.releaseProgressBarValue(pipeline,release,now)"
          :label="$options.filters.releaseProgressBarLabel(pipeline,release,now)"
          :variant="$options.filters.bootstrapVariant(release.releaseStatus)"
          :animated="$options.filters.animatedProgressBar(release.releaseStatus)"
        />
      </b-progress>
    </property-block>
    <property-block
      label="Released at"
      class="col-xxxl-2"
    >
      {{ release.insertedAt | formatDatetime }}
      <duration-label
        :duration="release.duration"
        :pending-duration="release.pendingDuration"
      />
    </property-block>
    <property-block
      label="Triggered by"
      class="col-xxxl-2"
    >
      <triggered-by :events="release.triggerEvents" />
    </property-block>
    <property-block
      v-if="showActions"
      label="Actions"
      class="col-xxxl-2"
    >
      <cancel-button :release="release" />
    </property-block>
  </router-link>
</template>

<script>
import { mapState } from 'vuex'
import { BProgress, BProgressBar } from 'bootstrap-vue'
import CancelButton from '@/components/CancelButton'
import TriggeredBy from '@/components/TriggeredBy'
import PropertyBlock from '@/components/PropertyBlock'
import DurationLabel from '@/components/DurationLabel'
import RepositoryTitle from '@/components/RepositoryTitle'
import refresh from '../helpers/refresh'

export default {
  components: {
    BProgress,
    BProgressBar,
    CancelButton,
    TriggeredBy,
    PropertyBlock,
    DurationLabel,
    RepositoryTitle
  },

  props: {
    release: {
      type: Object,
      default: null
    },
    pipeline: {
      type: Object,
      default: null
    },
    allReleasesMode: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      now: Date.now()
    }
  },

  created () {
    this.updateNow()
  },

  methods: {
    updateNow () {
      this.now = Date.now()
      if (this.release && (this.release.releaseStatus === 'pending' || this.release.releaseStatus === 'running')) {
        refresh.timeout(this.timeout, this.updateNow, 1)
      }
    }
  },

  beforeDestroy () {
    clearTimeout(this.timeout)
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    }),

    showActions () {
      return !this.allReleasesMode && this.user && this.user.active && this.release && (this.release.releaseStatus === 'pending' || this.release.releaseStatus === 'running' || this.release.releaseStatus === 'canceling')
    }
  }
}
</script>
