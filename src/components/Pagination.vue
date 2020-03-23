<template>
  <b-pagination-nav
    size="md"
    :link-gen="linkGenerator"
    use-router
    :number-of-pages="pagination.totalPages > 0 ? pagination.totalPages : 1"
    v-model="pagination.page"
    align="center"
    hide-goto-end-buttons
  />
</template>

<script>
import { BPaginationNav } from 'bootstrap-vue'

export default {
  components: {
    BPaginationNav
  },

  props: {
    linkGenerator: {
      type: Function,
      default: null
    },
    pagination: {
      type: Object,
      default: null
    }
  }
}
</script>
