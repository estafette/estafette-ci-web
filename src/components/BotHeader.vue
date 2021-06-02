<template>
  <div class="header-block">
    <property-block
      label="Bot"
      variant="success"
      title
    >
      <repository-title :repo="bot" />
    </property-block>
    <property-block
      :label="'Bot'"
      :value="bot.name"
    >
      {{ bot.name }}
    </property-block>
    <property-block label="Status">
      <b-progress>
        <b-progress-bar
          :value="$options.filters.botProgressBarValue(pipeline,bot,now)"
          :label="$options.filters.botProgressBarLabel(pipeline,bot,now)"
          :variant="$options.filters.bootstrapVariant(bot.botStatus)"
          :animated="$options.filters.animatedProgressBar(bot.botStatus)"
        />
      </b-progress>
    </property-block>
    <property-block label="Executed">
      {{ bot.insertedAt | formatDatetime }}
      <duration-label
        :duration="bot.duration"
        :pending-duration="bot.pendingDuration"
      />
    </property-block>
    <property-block label="Triggered by">
      <triggered-by :events="bot.triggerEvents" />
    </property-block>
    <property-block
      v-if="showActions"
      label="Actions"
    >
      <cancel-button :bot="bot" />
      <rerun-button :bot="bot" />
    </property-block>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BProgress, BProgressBar } from 'bootstrap-vue'
import CancelButton from '@/components/CancelButton'
import RerunButton from '@/components/RerunButton'
import TriggeredBy from '@/components/TriggeredBy'
import PropertyBlock from '@/components/PropertyBlock'
import RepositoryTitle from '@/components/RepositoryTitle'
import DurationLabel from '@/components/DurationLabel'
import refresh from '../helpers/refresh'

export default {
  components: {
    BProgress,
    BProgressBar,
    CancelButton,
    RerunButton,
    TriggeredBy,
    PropertyBlock,
    RepositoryTitle,
    DurationLabel
  },

  props: {
    bot: {
      type: Object,
      default: null
    },
    pipeline: {
      type: Object,
      default: null
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
      if (this.bot && (this.bot.botStatus === 'pending' || this.bot.botStatus === 'running')) {
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
      return this.user && this.user.active && this.bot && (this.bot.botStatus === 'failed' || this.bot.botStatus === 'pending' || this.bot.botStatus === 'running' || this.bot.botStatus === 'canceled' || this.bot.botStatus === 'canceling')
    }
  }
}
</script>
