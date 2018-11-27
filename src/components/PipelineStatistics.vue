<template>
    <div class="m-3 row">
      <pipeline-stats-timeline :pipeline="pipeline" type="builds" status="primary" />
      <pipeline-stats-timeline :pipeline="pipeline" type="releases" status="success" />
    </div>
</template>

<script>
export default {
  props: {
    pipeline: Object
  }
}
</script>
