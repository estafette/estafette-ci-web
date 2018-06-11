<template>
  <router-view/>
</template>

<script>
export default {
  name: 'PipelineDetails',
  data: function () {
    return {
      statistics: [],
      errors: []
    }
  }
}
</script>
