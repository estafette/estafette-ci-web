<template>
  <div>
    <tabs :tabs="tabs" />

    <router-view />
  </div>
</template>

<script>
import Tabs from '@/components/Tabs'

export default {
  components: {
    Tabs
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
