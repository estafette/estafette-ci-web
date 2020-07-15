<template>
  <div>
    <b-pagination-nav
      v-if="linkGenerator"
      :number-of-pages="pagination.totalPages > 0 ? pagination.totalPages : 1"
      :link-gen="linkGenerator"
      use-router
      size="md"
      hide-goto-end-buttons
      align="center"
    />
    <b-pagination
      v-else
      v-model="pagination.page"
      :total-rows="pagination.totalItems"
      :per-page="pagination.size"
      size="md"
      hide-goto-end-buttons
      align="center"
    />
  </div>
</template>

<script>
import { BPaginationNav, BPagination } from 'bootstrap-vue'

export default {
  components: {
    BPaginationNav,
    BPagination
  },

  props: {
    pagination: {
      type: Object,
      default: null
    },
    linkGenerator: {
      type: Function,
      default: null
    }
  }
}
</script>
