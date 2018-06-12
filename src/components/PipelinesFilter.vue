<template>
    <div class="m-3 justify-content-center">
        <router-link :to="{ name: 'Pipelines', query: { }}" exact active-class="active" class="btn btn-outline-primary">All</router-link>
        <router-link :to="{ name: 'Pipelines', query: { status: 'succeeded' }}" exact active-class="active" class="btn btn-outline-success">Succeeded</router-link>
        <router-link :to="{ name: 'Pipelines', query: { status: 'failed' }}" exact active-class="active" class="btn btn-outline-danger">Failed</router-link>
        <router-link :to="{ name: 'Pipelines', query: { status: 'running' }}" exact active-class="active" class="btn btn-outline-warning">Running</router-link>
    </div>
</template>

<script>
export default {
  name: 'PipelinesFilter',
  data: function () {
    return {
      pipelines: [],
      errors: []
    }
  }
}
</script>

<style>

</style>
