<template>
  <b-badge
    :to="{ name: 'CatalogGroupDetails', params: { id: group.id } }"
    variant="warning"
    class="mr-1"
  >
    {{ group.name }}
  </b-badge>
</template>

<script>
import { BBadge } from 'bootstrap-vue'

export default {
  components: {
    BBadge
  },

  props: {
    group: {
      type: Object,
      default: null
    }
  }
}
</script>
