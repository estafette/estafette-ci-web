<template>
  <div class="header-block">
    <div class="property-block-title">
      <property-label text="Pipeline release" />
      <property-value>
        <repository-title :repo="release" />
      </property-value>
    </div>
    <div class="property-block">
      <property-label :text="release.action ? 'Target (action)' : 'Target'" />
      <property-value>
        {{ release.name }}<span v-if="release.action">
          ({{ release.action }})
        </span>
      </property-value>
    </div>
    <div class="property-block">
      <property-label text="Version" />
      <property-value>
        {{ release.releaseVersion }}
      </property-value>
    </div>
    <div class="property-block">
      <property-label text="Status" />
      <property-value>
        <b-progress
          :value="100"
          :variant="$options.filters.bootstrapVariant(release.releaseStatus)"
          :animated="$options.filters.animatedProgressBar(release.releaseStatus)"
        />
      </property-value>
    </div>
    <div class="property-block">
      <property-label text="Released at" />
      <property-value>
        {{ release.insertedAt | formatDatetime }}
        <duration-label :duration="release.duration" />
      </property-value>
    </div>
    <div class="property-block">
      <property-label text="Triggered by" />
      <property-value>
        <triggered-by :events="release.triggerEvents" />
      </property-value>
    </div>
    <div
      v-if="showActions"
      class="property-block"
    >
      <property-label text="Actions" />
      <property-value>
        <cancel-button :release="release" />
      </property-value>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BProgress } from 'bootstrap-vue'
import CancelButton from '@/components/CancelButton'
import TriggeredBy from '@/components/TriggeredBy'
import PropertyLabel from '@/components/PropertyLabel'
import PropertyValue from '@/components/PropertyValue'
import RepositoryTitle from '@/components/RepositoryTitle'
import DurationLabel from '@/components/DurationLabel'

export default {
  components: {
    BProgress,
    CancelButton,
    TriggeredBy,
    PropertyLabel,
    PropertyValue,
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
