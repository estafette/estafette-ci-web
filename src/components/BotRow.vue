<template>
  <router-link
    :to="{ name: 'PipelineBotLogs', params: { repoSource: bot.repoSource, repoOwner: bot.repoOwner, repoName: bot.repoName, botID: bot.id }}"
    tag="div"
    class="row-block list-complete-item"
  >
    <property-block
      v-if="allBotsMode"
      label="Pipeline"
      class="col-xxxl-2"
    >
      <repository-title :repo="bot" />
    </property-block>
    <property-block
      :label="'Bot'"
      class="col-xxxl-2"
      :value="bot.name"
    >
      {{ bot.name }}
    </property-block>
    <property-block
      label="Status"
      class="col-xxxl-2"
      :value="bot.botStatus"
    >
      <b-progress>
        <b-progress-bar
          :value="$options.filters.releaseProgressBarValue(pipeline,bot,now)"
          :label="$options.filters.releaseProgressBarLabel(pipeline,bot,now)"
          :variant="$options.filters.bootstrapVariant(bot.botStatus)"
          :animated="$options.filters.animatedProgressBar(bot.botStatus)"
        />
      </b-progress>
    </property-block>
    <property-block
      label="Executed"
      class="col-xxxl-2"
    >
      {{ bot.insertedAt | formatDatetime }}
      <duration-label
        :duration="bot.duration"
        :pending-duration="bot.pendingDuration"
      />
    </property-block>
    <property-block
      label="Triggered by"
      class="col-xxxl-4"
    >
      <triggered-by :events="bot.triggerEvents" />
    </property-block>
    <property-block
      v-if="showActions"
      label="Actions"
      class="col-xxxl-2"
    >
      <cancel-button :bot="bot" />
      <rerun-button :bot="bot" />
    </property-block>
  </router-link>
</template>

<script>
import { mapState } from 'vuex'
import { BProgress, BProgressBar } from 'bootstrap-vue'
import CancelButton from '@/components/CancelButton'
import RerunButton from '@/components/RerunButton'
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
    RerunButton,
    TriggeredBy,
    PropertyBlock,
    DurationLabel,
    RepositoryTitle
  },

  props: {
    bot: {
      type: Object,
      default: null
    },
    pipeline: {
      type: Object,
      default: null
    },
    allBotsMode: {
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
      return !this.allBotsMode && this.user && this.user.active && this.bot && (this.bot.botStatus === 'failed' || this.bot.botStatus === 'pending' || this.bot.botStatus === 'running' || this.bot.botStatus === 'canceled' || this.bot.botStatus === 'canceling')
    }
  }
}
</script>
