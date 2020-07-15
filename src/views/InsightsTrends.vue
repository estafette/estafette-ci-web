<template>
  <div>
    <div class="row">
      <div class="col-12 col-xl-6">
        <stats-adoption
          type="builds"
          status="primary"
          class="mb-3"
        />
      </div>
      <div class="col-12 col-xl-6">
        <stats-adoption
          type="releases"
          status="success"
          class="mb-3"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StatsAdoption from '@/components/StatsAdoption'

export default {
  components: {
    StatsAdoption
  }
}
</script>
