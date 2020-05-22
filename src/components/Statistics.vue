<template>
  <div>
    <b-jumbotron
      header="Insights"
      lead="See daily stats, rankings and trends for builds & releases"
      bg-variant="primary"
      text-variant="white"
      header-level="5"
      class="mb-3 pl-3 pt-3 pr-3 pb-1"
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
          to: { name: 'StatisticsCounters' }
        },
        {
          text: 'Rankings',
          icon: 'list-ol',
          enabled: true,
          to: { name: 'StatisticsRankings' }
        },
        {
          text: 'Trends',
          icon: 'chart-line',
          enabled: true,
          to: { name: 'StatisticsTrends' }
        }
      ]
    }
  }
}
</script>
