<template>
  <router-view/>
</template>

<script>
export default {
  name: 'PipelineBuilds',
  data: function () {
    return {
      statistics: [],
      errors: []
    }
  }
}
</script>
