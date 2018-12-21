<template>
  <div>
    <ul class="nav nav-tabs m-3">
      <li class="nav-item">
        <router-link
          :to="{ name: 'StatisticsCounters'}"
          class="nav-link"
        >
          Counters
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'StatisticsRankings'}"
          class="nav-link"
        >
          Rankings
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'StatisticsTrends'}"
          class="nav-link"
        >
          Trends
        </router-link>
      </li>
    </ul>

    <router-view />
  </div>
</template>
