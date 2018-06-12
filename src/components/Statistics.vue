<template>
  <div>
    <div class="d-inline-flex singlestat card bg-light mb-3 mt-3 ml-3">
    <div class="card-body">
        <h5 class="card-title text-center">Pipelines</h5>
        <p class="card-text">546</p>
    </div>
    </div>

    <div class="d-inline-flex singlestat card bg-light mb-3 mt-3 ml-3">
    <div class="card-body">
        <h5 class="card-title text-center">Targets</h5>
        <p class="card-text">17</p>
    </div>
    </div>

    <div class="d-inline-flex singlestat card bg-light mb-3 mt-3 ml-3">
    <div class="card-body">
        <h5 class="card-title text-center">Builds (last month)</h5>
        <p class="card-text">1381</p>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      statistics: [],
      errors: []
    }
  }
}
</script>

<style scoped>
.singlestat {
    font-size: 4vw;
    text-align: center;
    width: 4em;
}
</style>
