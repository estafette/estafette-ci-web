<template>
    <div class="m-3 justify-content-center">
        <router-link :to="{ name: 'Pipelines' }" exact class="btn btn-outline-primary">All</router-link>
        <router-link :to="{ name: 'Pipelines', query: { status: 'succeeded' } }" exact class="btn btn-outline-success">Succeeded</router-link>
        <router-link :to="{ name: 'Pipelines', query: { status: 'failed' } }" exact class="btn btn-outline-danger">Failed</router-link>
        <router-link :to="{ name: 'Pipelines', query: { status: 'running' } }" exact class="btn btn-outline-warning">Running</router-link>
    </div>
</template>

<script>
export default {
  data: function () {
    return {}
  },
  watch: {
    '$route' (to, from) {
      // react to route changes...
      console.log('watch route', to, from)
    }
  }
}
</script>

<style>

</style>
