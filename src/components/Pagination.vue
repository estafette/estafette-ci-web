<template>
  <div>
    <b-pagination-nav
      v-if="linkGenerator"
      v-model="pagination.page"
      :number-of-pages="pagination.totalItems > 0 ? pagination.totalItems : 1"
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
