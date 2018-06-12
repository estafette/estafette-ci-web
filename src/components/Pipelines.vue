<template>
    <div>
        <pipelines-filter/>
        <pipelines-list/>
    </div>
</template>

<script>
export default {
  name: 'Pipelines',
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
