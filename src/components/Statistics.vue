<template>
  <div>
    <ul
      class="nav nav-tabs m-3"
    >
      <li class="nav-item">
        <router-link
          :to="{ name: 'StatisticsCounters'}"
          class="nav-link"
        >
          <font-awesome-icon
            icon="chart-pie"
            class="mr-2"
          />
          Counters
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'StatisticsRankings'}"
          class="nav-link"
        >
          <font-awesome-icon
            icon="list-ol"
            class="mr-2"
          />
          Rankings
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'StatisticsTrends'}"
          class="nav-link"
        >
          <font-awesome-icon
            icon="chart-line"
            class="mr-2"
          />
          Trends
        </router-link>
      </li>
    </ul>

    <router-view />
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChartPie, faListOl, faChartLine } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChartPie, faListOl, faChartLine)

export default {
  components: {
    FontAwesomeIcon
  }
}
</script>
