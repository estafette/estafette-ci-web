<template>
  <div>
    <b-jumbotron
      header="Insights"
      bg-variant="primary"
      text-variant="white"
      header-level="5"
      container-fluid
      fluid
      class="section-header"
    />

    <tabs :tabs="tabs" />

    <router-view />
  </div>
</template>

<script>
import Tabs from '@/components/Tabs'
import { BJumbotron } from 'bootstrap-vue'

export default {
  components: {
    Tabs,
    BJumbotron
  },
  data: function () {
    return {
      tabs: [
        {
          text: 'Counters',
          icon: 'chart-pie',
          enabled: true,
          to: { name: 'InsightsCounters' }
        },
        {
          text: 'Rankings',
          icon: 'list-ol',
          enabled: true,
          to: { name: 'InsightsRankings' }
        },
        {
          text: 'Trends',
          icon: 'chart-line',
          enabled: true,
          to: { name: 'InsightsTrends' }
        }
      ]
    }
  }
}
</script>
