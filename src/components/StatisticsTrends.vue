<template>
    <div class="m-3 row">
      <stats-adoption type="builds" status="primary"/>
      <stats-adoption type="releases" status="success"/>
    </div>
</template>

<script>
export default {
  components: {
    'stats-adoption': () => import(/* webpackChunkName: "stats-adoption" */ '@/components/StatsAdoption')
  }
}
</script>
